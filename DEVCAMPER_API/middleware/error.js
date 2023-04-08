const ErrorResponse = require("../utils/ErrorResponse");

const ErrorHandler = (err, req, res, next) => {
  //console.log(err.message.red);
  let error = { ...err };

  error.message = err.message;

  if (err.stack.startsWith("CastError")) {
    error = new ErrorResponse(
      `${req.method} Bootcamp not found with id of ${err.value}`,
      404
    );
  }

  res.status(error.status || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = ErrorHandler;
