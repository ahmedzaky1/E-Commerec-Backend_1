const express = require("express");
//const { param, validationResult } = require("express-validator");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validator/authValidator");
const { signup, login } = require("../services/authServices");

const router = express.Router();

router.route("/sign").post(signupValidator, signup);
router.route("/login").post(loginValidator, login);

module.exports = router;
