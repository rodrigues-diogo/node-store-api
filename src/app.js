"use strict";

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zqvrb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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
