const ErrorResponse = require("../utils/ErrorResponse");

const ErrorHandler = (err, req, res, next) => {
  // console.log(err);
  let error = { ...err };

  error.message = err.message;

  // Mongoose bad objectID
  if (err.stack.startsWith("CastError")) {
    error = new ErrorResponse(
      `${req.method} Bootcamp not found with id of ${err.value}`,
      404
    );
  }

  // Mongoose duplicate name
  if (err.code === 11000) {
    error = new ErrorResponse(
      `${req.method} Duplicate field value entered`,
      400
    );
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((e) => e.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.status || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = ErrorHandler;
