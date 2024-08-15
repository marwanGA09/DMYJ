function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      //   console.log('catch', err);
      next(err);
    });
  };
}

module.exports = catchAsync;

// module.exports = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };
// };
