"use strict";

const Product = require("../models/products");
const ValidationContract = require("../validators/validator");

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
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.title,
    3,
    "The title field should has at least 3 characters"
  );
  contract.hasMinLen(
    req.body.slug,
    3,
    "The slug field should has at least 3 characters"
  );
  contract.hasMinLen(
    req.body.description,
    3,
    "The description field should has at least 3 characters"
  );

  if (!contract.isValid()) {
    res.status(400).send(contract.getErrors()).end();
  }

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
  Product.findByIdAndDelete(req.body.id)
    .then(() => {
      res.status(200).send({
        message: "Product was successfully deleted!",
      });
    })
    .catch(() => {
      res.status(400).send({
        message: "Failed to delte the product",
        data: e,
      });
    });
};
