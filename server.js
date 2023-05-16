const express = require("express");
const { json } = require("express");
const Fabric = require("./services/fabric");
const cors = require("cors");
const {
  CHANNEL,
  CHAINCODE,
  CONTRACTS,
  PORT,
  TRANSACTIONS,
} = require("./configs/index");
const { routes } = require("./routes/index");

const app = express();

app.use(json());
app.use(cors());

app.use("/", routes);

app.listen(PORT, async () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);

  try {
    await Fabric.loginIdentity("admin", "adminpw", "org1");
    const wallet = await Fabric.createWallet("org1", "admin");
    const gateway = await Fabric.createGateway(wallet, "admin", "org1");
    const users = await Fabric.getContract(
      gateway,
      CHANNEL,
      CHAINCODE,
      CONTRACTS.USERS
    );
    await users.submitTransaction(TRANSACTIONS.USERS.INIT);
    const shops = await Fabric.getContract(
      gateway,
      CHANNEL,
      CHAINCODE,
      CONTRACTS.SHOPS
    );
    await shops.submitTransaction(TRANSACTIONS.SHOPS.INIT);
    const requests = await Fabric.getContract(
      gateway,
      CHANNEL,
      CHAINCODE,
      CONTRACTS.REQUESTS
    );
    await requests.submitTransaction(TRANSACTIONS.REQUESTS.INIT);
    console.log("SUCCESS");
  } catch (e) {
    console.log(e);
  }
});
