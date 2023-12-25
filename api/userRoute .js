const express = require("express");
//const { param, validationResult } = require("express-validator");
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  chanegUserPasswordValidator,
} = require("../utils/validator/userValidator");
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changeUserPassword,
} = require("../services/userServices");

const router = express.Router();

// Change password
router.put(
  "/changePassword/:id",
  chanegUserPasswordValidator,
  changeUserPassword
);

router
  .route("/")
  .get(getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser);
router.route("/:id").get(getUserValidator, getUser);
router
  .route("/:id")
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser);
router.route("/:id").delete(deleteUserValidator, deleteUser);

module.exports = router;
