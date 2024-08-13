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

const errorController = (err, req, res, next) => {
  // console.log(err);

  // err.message = err.message || 'some thing goes very wrong';
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'production') {
    productionError(err, res);
  } else if (process.env.NODE_ENV === 'development') {
    developmentError(err, res);
  }
};

module.exports = errorController;
