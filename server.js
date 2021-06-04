"use strict";

const http = require("http");
const express = require("express");

const app = express();
const port = normalizePort(process.env.PORT || 8000);
app.set("port", port);

const server = http.createServer(app);
const router = express.Router();

const route = router.get("/", (req, res, next) => {
  res.status(200).send({
    title: "Node Store API",
    version: "0.0.1",
  });
});

app.use("/", route);

server.listen(port);

console.log(`API is listening on port: ${port}`);

function normalizePort(port) {
  var port = parseInt(port, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port > 0) {
    return port;
  }

  return false;
}
