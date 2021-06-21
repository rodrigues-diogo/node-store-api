"use strict";

const repository = require("../repositories/order-repository");
const guid = require("guid");

exports.get = async (req, res, next) => {
  try {
    const data = await repository.get();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Failed while process the request" });
  }
};

exports.post = async (req, res, next) => {
  let data = {
    customer: req.body.customer,
    number: guid.raw().substring(0, 6),
    items: req.body.items,
  };

  try {
    await repository.create(data);
    res.status(201).send({
      message: "Order was successfully registered!",
    });
  } catch (error) {
    res.status(500).send({ message: "Failed while process the request" });
  }
};
