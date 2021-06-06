"use strict";

const express = require("express");
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/products-route");

const app = express();
app.use(express.json());

app.use("/", indexRoute);
app.use("/products", productRoute);

module.exports = app;
