"use strict";

const ValidationContract = require("../validators/validator");
const repository = require("../repositories/customer-repository");

exports.post = async (req, res, next) => {
  const contract = new ValidationContract();

  contract.hasMinLen(
    req.body.name,
    3,
    "The name field should has at least 3 characters"
  );
  contract.isEmail(
    req.body.email,
    "The provided email address has not a valid value"
  );
  contract.hasMinLen(
    req.body.password,
    8,
    "The password should has at least 8 characters"
  );

  if (!contract.isValid()) {
    res.status(400).send(contract.getErrors()).end();
  }

  try {
    await repository.create(req.body);
    res.status(201).send({
      message: "Customer was successfully registered!",
    });
  } catch (error) {
    res.status(500).send({ message: "Failed while process the request" });
  }
};
