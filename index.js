const express = require("express");
require("dotenv").config();
const factRoute = require("./factRoute");
const cors = require("cors");
const connect = require("./dbConnection");
const path = require("path");

const startServer = async () => {
  const app = express();
  const db = await connect();
  app.locals.db = db;
  // mount middlewares
  app.use(express.json());
  app.use(cors());
  app.use("/facts", factRoute);
  // use the client app
  app.use(express.static(path.join(__dirname, "/client/dist")));

  // render client
  app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/dist/index.html"));
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(` App listening on port ${PORT}`));
};

startServer();
