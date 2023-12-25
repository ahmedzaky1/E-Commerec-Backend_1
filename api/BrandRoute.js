const express = require("express");
//const { param, validationResult } = require("express-validator");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validator/BrandValidator");
const {
  getBrand,
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require("../services/BrandServices ");

const router = express.Router();


router
  .route("/")
  .get(getBrands)
  .post(uploadBrandImage, resizeImage,createBrandValidator, createBrand);
router.route("/:id").get(getBrandValidator, getBrand);
router.route("/:id").put(uploadBrandImage, resizeImage,updateBrandValidator, updateBrand);
router.route("/:id").delete(deleteBrandValidator, deleteBrand);

module.exports = router;
