const bcrypt = require('bcrypt');
const jsToken = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/UserModel');

const signIn = catchAsync(async (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return next(new AppError('please provide userName and password', 400));
  }

  const user = await User.findOne({ userName }).select('+password');
  if (!(user && user.checkPassword(password, user.password))) {
    return next(new AppError('incorrect username or password', 401));
  }
  const token = await jsToken.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES,
  });
  return res.status(400).json({
    status: 'success',
    token,
  });
});

const protected = catchAsync(async (req, res, next) => {
  let token, decodedToken;
  console.log(req.headers.authorization);
  console.log(!req.headers.authorization?.startsWith('Bearer'));
  if (!req.headers.authorization?.startsWith('Bearer')) {
    console.log('error ocuur');
    return next(new AppError('please login first', 401));
  } else {
    token = req.headers.authorization.split(' ')[1];
  }
  try {
    decodedToken = jsToken.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    return next(new AppError(`${err.message} please login`, 401));
  }
  const currentUser = await User.findById(decodedToken.id);
  if (!currentUser) {
    return next(new AppError('user does not exist', 404));
  }
  next();
});

module.exports = {
  signIn,
  protected,
};
