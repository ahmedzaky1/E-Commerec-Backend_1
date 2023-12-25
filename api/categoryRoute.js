const express = require("express");
//const { param, validationResult } = require("express-validator");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validator/categoryValidator");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
} = require("../services/categoryServices");
const subCategoryRoute = require("./subCategoryRoute");
const authService = require("../services/authServices");

const router = express.Router();

router.use("/:categoryId/subCategories", subCategoryRoute);

router
  .route("/")
  .get(getCategories)
  .post(
    authService.protect,
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  );
router.route("/:id").get(getCategoryValidator, getCategory);
router
  .route("/:id")
  .put(
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory
  );
router.route("/:id").delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
