const express = require("express");

const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../services/subCategoryServices");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validator/subCategoryValidator");

const router = express.Router({ mergeParams: true}); // mergeParams === acess params for anthor router 

router.route("/").post(createSubCategoryValidator, createSubCategory);
router.route("/").get(getSubCategories);
router.route("/:id").get(getSubCategoryValidator, getSubCategory);
router.route("/:id").put(updateSubCategoryValidator, updateSubCategory);
router.route("/:id").delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
