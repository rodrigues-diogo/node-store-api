"use strict";

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(config.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/products-route");
const customerRoute = require("./routes/customers-route");
const orderRoute = require("./routes/order-route");

const app = express();
app.use(express.json());

app.use("/", indexRoute);
app.use("/products", productRoute);
app.use("/customers", customerRoute);
app.use("/orders", orderRoute);

module.exports = app;
