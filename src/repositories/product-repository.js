"use strict";

const Product = require("../models/products");

exports.get = async () => {
  const res = await Product.find(
    {
      active: true,
    },
    "title price slug description"
  );
  return res;
};

exports.getById = async (id) => {
  const res = await Product.findById(id);
  return res;
};

exports.getBySlug = async (slug) => {
  const res = await Product.findOne(
    {
      slug: slug,
      active: true,
    },
    "title price slug description tags"
  );
  return res;
};

exports.getByTag = async (tag) => {
  const res = await Product.find(
    {
      tags: tag,
      active: true,
    },
    "title price slug description tags"
  );
  return res;
};

exports.create = async (data) => {
  const product = new Product(data);
  const res = await product.save();
  return res;
};

exports.update = async (id, data) => {
  const res = await Product.findByIdAndUpdate(id, {
    title: data.title,
    description: data.description,
    price: data.price,
    slug: data.slug,
  });
  return res;
};

exports.delete = async (id) => {
  const res = await Product.findByIdAndDelete(id);
  return res;
};
