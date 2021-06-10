"use strict";

const Product = require("../models/products");
const ValidationContract = require("../validators/validator");
const repository = require("../repositories/product-repository");

exports.get = async (req, res, next) => {
  try {
    const data = await repository.get();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Failed while process the request" });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Failed while process the request" });
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    const data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Failed while process the request" });
  }
};

exports.getByTag = async (req, res, next) => {
  try {
    const data = await repository.getByTag(req.params.tag);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Failed while process the request" });
  }
};

exports.post = async (req, res, next) => {
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

  try {
    await repository.create(req.body);
    res.status(201).send({
      message: "Product was successfully registered!",
    });
  } catch (error) {
    res.status(500).send({ message: "Failed while process the request" });
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({
      message: "Product was successfully updated!",
    });
  } catch (error) {
    res.status(500).send({ message: "Failed while process the request" });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.params.id);
    res.status(200).send({
      message: "Product was successfully deleted!",
    });
  } catch (error) {
    res.status(500).send({ message: "Failed while process the request" });
  }
};
