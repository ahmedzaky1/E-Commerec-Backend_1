const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors");

const userModel = require("../models/userModel");

// @desc    Signup
// @route   POST  /api/v1/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
  // 1) Create User

  const user = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // 2) Generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_KEY,
  });

  res.status(201).json({ data: user, token });
});

// @desc    login
// @route   POST  /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  // 1) check if password and email in the body (Validation)
  // 2) check if user exist & check if password is correct
  const user = await userModel.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }
  // 3) Generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_KEY,
  });

  // 4) send response to client side
  res.status(201).json({ data: user, token });
});

exports.protect = asyncHandler(async (req, res, next) => {
  // 1) check if token exists, if exist get into
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new ApiError(
        "You are not login, please login to get access to this route",
        401
      )
    );
  }
  // 2) verify token (no change happens, expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);
  // 3) Check if user exists
  const currentUser = await userModel.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "The User that belongs to this token does no longer exist",
        401
      )
    );
  }
  // 4) Check if user changed password after token created
  if (currentUser.passwordChangeAt) {
    const passChangeedTimestamp = parseInt(
      currentUser.passwordChangeAt.getTime() / 1000,
      10
    );

    //Password change after token created (Error)
    if (passChangeedTimestamp > decoded.iat) {
      return next(
        new ApiError(
          "User recently changed password, please login again..",
          401
        )
      );
    }
  }

  req.user = currentUser;
  next();
});
