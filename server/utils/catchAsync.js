function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res).catch((err) => {
      //   console.log('catch', err);
      next(err);
    });
  };
}

module.exports = catchAsync;
