const express = require("express");
const Fabric = require("./services/fabric");
const { PORT } = require("./configs/index");

const app = express();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, async () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
  Fabric.loginIdentity("admin", "adminpw", "org1");
  const wallet = await Fabric.createWallet("org1", "admin");
  const gateway = await Fabric.createGateway(wallet, "admin", "org1");
});
