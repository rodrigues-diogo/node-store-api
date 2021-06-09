"use strict";

const Product = require("../models/products");
const ValidationContract = require("../validators/validator");
const repository = require("../repositories/product-repository");

exports.get = (req, res, next) => {
  repository
    .get()
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
  repository
    .getById(req.params.id)
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
  repository
    .getBySlug(req.params.slug)
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
  repository
    .getByTag(req.params.tag)
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

  Product.create(req.body)
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
  repository
    .update(req.params.id, req.body)
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

exports.delete = (req, res, next) => {
  repository
    .delete(req.body.id)
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
