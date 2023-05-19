const {
  ORGS,
  TRANSACTIONS,
  CONTRACTS,
  CHANNEL,
  CHAINCODE,
} = require("../configs");
const Fabric = require("./fabric");
const { fromBuffer } = require("../helpers");

module.exports = class UserServices {
  static async login(login, password, org = ORGS.Users) {
    try {
      await Fabric.loginIdentity(login, password, org);

      const wallet = await Fabric.createWallet(org, login);
      const gateway = await Fabric.createGateway(wallet, login, org);
      const contract = await Fabric.getContract(
        gateway,
        CHANNEL,
        CHAINCODE,
        CONTRACTS.USERS
      );
      const userData = await contract.submitTransaction(
        TRANSACTIONS.USERS.GET_USER,
        login
      );

      if (userData) {
        gateway.disconnect();
        const user = fromBuffer(userData);
        return user;
      }
      throw "User not registered or wrong password";
    } catch (e) {
      console.log(e);
    }
  }

  static async registration(name, login, password) {
    try {
      await Fabric.registerIdentity(login, password, ORGS.Users);
      const wallet = await Fabric.createWallet(ORGS.Users, login);
      const gateway = await Fabric.createGateway(wallet, login, ORGS.Users);
      const contract = await Fabric.getContract(
        gateway,
        CHANNEL,
        CHAINCODE,
        CONTRACTS.USERS
      );
      const userData = await contract.submitTransaction(
        TRANSACTIONS.USERS.REG,
        login,
        name
      );
      if (userData) {
        gateway.disconnect();
        const user = fromBuffer(userData);
        return user;
      }
    } catch (e) {
      console.log(e);
    }
  }
};
