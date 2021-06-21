"use strict";

const Order = require("../models/order");

exports.get = async (data) => {
  return await Order.find({}, "number status customer items")
    .populate("customer", "name")
    .populate("items.product", "title");
};

exports.create = async (data) => {
  const order = new Order(data);
  return await order.save();
};
