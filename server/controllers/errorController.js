const AppError = require('../utils/AppError');

const productionError = (err, res) => {
  console.log('from production');
  if (!err.isOperational) {
    console.log('ERROR BOOM', err);
    return res.status(500).json({
      status: 'error',
      message: 'some thing goes very very wrong...',
    });
  }
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const developmentError = (err, res) => {
  console.log('from development');
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// THIS BELLOW TWO (handleCastError, handleValidationError) FUNCTION IS USED TO MAKE MONGOOSE ERROR INTO OPERATIONAL
const handleCastError = (err) => {
  // Transfer CastError into operational error
  // 400 bad request
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

const handleValidationError = (err) => {
  // Transfer validationError into operational error
  return new AppError(err.message, 400);
};

const errorController = (err, req, res, next) => {
  console.log(err.message);

  err.message = err.message || 'some thing goes very wrong';
  // status and statusCode can be added for mongoose error
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'production') {
    // let error = { ...err };
    if (err.name === 'CastError') {
      err = handleCastError(err);
    }
    if (err.name === 'ValidationError') {
      err = handleValidationError(err);
    }
    productionError(err, res);
  } else if (process.env.NODE_ENV === 'development') {
    developmentError(err, res);
  }
};

module.exports = errorController;
