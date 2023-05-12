const express = require("express");
const Fabric = require("./services/fabric");

const app = express();
const port = 5000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`SERVER RUNNING ON PORT: ${port}`));
