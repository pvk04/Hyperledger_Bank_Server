const {
  ORGS,
  TRANSACTIONS,
  CONTRACTS,
  CHANNEL,
  CHAINCODE,
} = require("../configs");
const Fabric = require("./fabric");
const { fromBuffer } = require("../helpers");

module.exports = class ShopServices {
  static async getShops() {
    try {
      const org = ORGS.Users;
      const login = "unauthorized";
      const wallet = await Fabric.createWallet(org, login);
      const gateway = await Fabric.createGateway(wallet, login, org);
      const contract = await Fabric.getContract(
        gateway,
        CHANNEL,
        CHAINCODE,
        CONTRACTS.SHOPS
      );
      const shopsData = await contract.submitTransaction(
        TRANSACTIONS.SHOPS.GET_SHOPS
      );

      if (shopsData) {
        gateway.disconnect();
        const shops = await fromBuffer(shopsData);
        return shops;
      }
      throw "Error";
    } catch (e) {
      console.log(e);
    }
  }

  static async setShop(org, login, role, city) {
    try {
      if (role != 2) throw "You dont have access to do this";

      const wallet = await Fabric.createWallet(org, login);
      const gateway = await Fabric.createGateway(wallet, login, org);
      const contract = await Fabric.getContract(
        gateway,
        CHANNEL,
        CHAINCODE,
        CONTRACTS.SHOPS
      );
      const shopsData = await contract.submitTransaction(
        TRANSACTIONS.SHOPS.SET_SHOP,
        city
      );

      if (shopsData) {
        gateway.disconnect();
        const shops = await fromBuffer(shopsData);
        return shops;
      }
      throw "Error";
    } catch (e) {
      console.log(e);
    }
  }

  static async setRate(login, shopId, rate, text) {
    try {
      const wallet = await Fabric.createWallet("org1", login);
      const gateway = await Fabric.createGateway(wallet, login, "org1");
      const contract = await Fabric.getContract(
        gateway,
        CHANNEL,
        CHAINCODE,
        CONTRACTS.SHOPS
      );
      const shopsData = await contract.submitTransaction(
        TRANSACTIONS.SHOPS.SET_RATE,
        shopId,
        login,
        rate,
        text
      );

      if (shopsData) {
        gateway.disconnect();
        const shops = await fromBuffer(shopsData);
        return shops;
      }
      throw "Error";
    } catch (e) {
      console.log(e);
    }
  }

  static async likeRate(shopId, login, rateId, isLike) {
    try {
      const wallet = await Fabric.createWallet("org1", login);
      const gateway = await Fabric.createGateway(wallet, login, "org1");
      const contract = await Fabric.getContract(
        gateway,
        CHANNEL,
        CHAINCODE,
        CONTRACTS.SHOPS
      );
      const shopsData = await contract.submitTransaction(
        TRANSACTIONS.SHOPS.LIKE_RATE,
        shopId,
        login,
        rateId,
        isLike
      );

      if (shopsData) {
        gateway.disconnect();
        const shops = await fromBuffer(shopsData);
        return shops;
      }
      throw "Error";
    } catch (e) {
      console.log(e);
    }
  }
};
