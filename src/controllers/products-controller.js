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

exports.getById = (req, res, next) => {
  Product.findById(req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send({
        data: e,
      });
    });
};

exports.getBySlug = (req, res, next) => {
  Product.findOne(
    {
      slug: req.params.slug,
      active: true,
    },
    "title price slug description tags"
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

exports.getByTag = (req, res, next) => {
  Product.find(
    {
      tags: req.params.tag,
      active: true,
    },
    "title price slug description tags"
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
  Product.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  })
    .then(() => {
      res.status(200).send({
        message: "Product was successfully updated!",
      });
    })
    .catch(() => {
      res.status(400).send({
        message: "Failed to update the product",
        data: e,
      });
    });
};

exports.del = (req, res, next) => {
  res.status(200).send(req.body);
};
