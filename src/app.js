"use strict";

const express = require("express");

const app = express();
app.use(express.json());

const router = express.Router();

const route = router.get("/", (req, res, next) => {
  res.status(200).send({
    title: "Node Store API",
    version: "0.0.1",
  });
});

const create = router.post("/", (req, res, next) => {
  res.status(201).send(req.body);
});

const put = router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).send({
    id: id,
    item: req.body,
  });
});

const del = router.delete("/:id", (req, res, next) => {
  res.status(200).send(req.body);
});

app.use("/", route);
app.use("/products", create);
app.use("/products", put);
app.use("/products", del);

module.exports = app;
