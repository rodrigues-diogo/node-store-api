"use strict";

const express = require("express");
const controller = require("../controllers/products-controller");

const router = express.Router();

router.get("/", controller.get);
router.get("/:slug", controller.getBySlug);
router.get("/admin/:id", controller.getById);
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/:id", controller.del);

module.exports = router;
