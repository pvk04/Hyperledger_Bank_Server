const { readFileSync } = require("fs");
const { Gateway, Wallets } = require("fabric-network");
const path = require("path");

module.exports = class Fabric {
  static getConnectionProfile(org) {
    console.log(process.cwd());
    return JSON.parse(readFileSync(`./gateway/connection-${org}.json`));
  }

  static buildWallet(login, org) {
      
  }
};
