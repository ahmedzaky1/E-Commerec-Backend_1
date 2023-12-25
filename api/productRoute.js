const express = require("express");
//const { param, validationResult } = require("express-validator");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validator/productValidator");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productServices");

const router = express.Router();

router.route("/").get(getProducts).post(createProductValidator, createProduct);
router.route("/:id").get(getProductValidator, getProduct);
router.route("/:id").put(updateProductValidator, updateProduct);
router.route("/:id").delete(deleteProductValidator, deleteProduct);

module.exports = router;
