const ApiError = require("../utils/apiErrors");

const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorForProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

const handlejwtInvalidSignature = () =>
  new ApiError("Invalid token, please login again...", 401);

const handlejwtExpired = () =>
  new ApiError("Invalid token, please login again...", 401);

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") err = handlejwtInvalidSignature();
    if (err.name === "TokenExpiredError") err = handlejwtExpired();
    sendErrorForProd(err, res);
  }
};

module.exports = globalError;
