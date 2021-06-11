"use strict";

const Customer = require("../models/customer");

exports.create = async (data) => {
  const customer = new Customer(data);
  const res = await customer.save();
  return res;
};
