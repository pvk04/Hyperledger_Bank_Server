const { readFileSync } = require("fs");
const { Gateway, Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");

module.exports = class Fabric {
  static getConnectionProfile(org) {
    // build an in memory object with the network configuration (also known as a connection profile)
    // парсит файл соединения и возвращает объект
    console.log(process.cwd());
    return JSON.parse(readFileSync(`./gateway/connection-${org}.json`));
  }

  static buildCAClient(org) {
    // build an instance of the fabric ca services client based on
    // the information in the network configuration
    const connectionProfile = this.getConnectionProfile(org); // получаем объект соединения
    const caInfo =
      connectionProfile.certificateAuthorities[`ca.${org}.example.com`];
    const caTLSCACerts = caInfo.tlsCACerts.pem;

    return new FabricCAServices(
      caInfo.url,
      {
        trustedRoots: caTLSCACerts,
        verify: false,
      },
      caInfo.name
    );
  }

  static async buildWallet(login, org) {
    return await Wallets.newFileSystemWallet(`./wallets/${org}-${login}`);
  }

  static async getAdmin(org) {
    const wallet = await this.buildWallet("admin", org);
    return await wallet.get(wallet);
  }

  static async getAdminIdentity(org) {
    const wallet = this.buildWallet("admin", org);
    const adminIdentity = await wallet.get("admin");
    if (!adminIdentity) {
      return new Error();
    }
    const provider = (await wallet)
      .getProviderRegistry()
      .getProvider(adminIdentity.type);

    return await provider.getUserContext(adminIdentity, "admin");
  }

  static async createGateway(wallet, login, org) {
    const gateway = new Gateway();
    const connectionProfile = this.getConnectionProfile(org);
    await gateway.connect(connectionProfile, {
      identity: login,
      discovery: {
        asLocalhost: true,
        enabled: true,
      },
      wallet,
    });

    return gateway;
  }

  static async createIdentity(org, enrollment) {
    const mspId = `${org[0].toUpperCase()}${org.slice(1)}MSP`;
    return {
      credentials: {
        certficate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId,
      type: "X.509",
    };
  }

  static async registerIdentity(login, password = "0000", org = "org1") {
    try {
      const admin = await this.getAdminIdentity(org);

      const ca = this.buildCAClient(org);
      await ca.register(
        {
          enrollmentID: login,
          enrollmentSecret: password,
          maxEnrollments: 2 ** 32,
        },
        admin
      );

      const enrollment = await ca.enroll({
        enrollmentID: login,
        enrollmentSecret: password,
      });

      const identity = this.createIdentity(org, enrollment);

      const wallet = await this.buildWallet(login, org);
      await wallet.put(login, identity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  static async loginIdentity(login, password, org = "org1") {
    const caClient = this.buildCAClient(org);
    const enrollment = await ca.enroll({
      enrollmentSecret: password,
      enrollmentID: login,
    });
    const wallet = await this.buildWallet(login, org);
    const identity = this.createIdentity(org, enrollment);
    await wallet.put(login, identity);
  }

  static async getContract(gateway, channelName, chaincode, contract) {
    const channel = await gateway.getNetwork(channelName);
    return await channel.getContract(chaincode, contract);
  }
};
