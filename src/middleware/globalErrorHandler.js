import { config } from "../config/config.js";

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    message: err.message,
    errorStack:  err.stack
  });
};

export default globalErrorHandler;
