"use strict";

const Product = require("../models/products");

exports.get = (req, res, next) => {
  return Product.find(
    {
      active: true,
    },
    "title price slug description"
  );
};

exports.getById = (id) => {
  return Product.findById(id);
};

exports.getBySlug = (slug) => {
  return Product.findOne(
    {
      slug: slug,
      active: true,
    },
    "title price slug description tags"
  );
};

exports.getByTag = (tag) => {
  return Product.find(
    {
      tags: tag,
      active: true,
    },
    "title price slug description tags"
  );
};

exports.create = (data) => {
  const product = new Product(data);
  return product.save();
};

exports.update = (id, data) => {
  return Product.findByIdAndUpdate(id, {
    title: data.title,
    description: data.description,
    price: data.price,
    slug: data.slug,
  });
};

exports.delete = (id) => {
  return Product.findByIdAndDelete(id);
};
