const { validationResult } = require("express-validator");

const validatorMiddleware = (req, res, next) => {
  // req.params.id is an ObjectId now
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validatorMiddleware;