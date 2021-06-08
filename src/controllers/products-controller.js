"use strict";

const Product = require("../models/products");

exports.get = (req, res, next) => {
  Product.find(
    {
      active: true,
    },
    "title price slug description"
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send({
        data: e,
      });
    });
};

exports.post = (req, res, next) => {
  const product = new Product(req.body);
  product
    .save()
    .then((x) => {
      res.status(201).send({
        message: "Product was successfully registered!",
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: "Failed to register the product",
        data: e,
      });
    });
};

exports.put = (req, res, next) => {
  const id = req.params.id;
  res.status(200).send({
    id: id,
    item: req.body,
  });
};

exports.del = (req, res, next) => {
  res.status(200).send(req.body);
};
