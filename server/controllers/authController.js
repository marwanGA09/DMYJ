const bcrypt = require('bcrypt');
const jsToken = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/UserModel');

const signIn = catchAsync(async (req, res, next) => {
  console.log('singIn');
  const { userName, password } = req.body;
  if (!userName || !password) {
    return next(new AppError('please provide userName and password', 400));
  }

  const user = await User.findOne({ userName }).select('+password');
  if (!(user && user.checkPassword(password, user.password))) {
    return next(new AppError('incorrect username or password', 400));
  }
  console.log(user._id);
  const token = await jsToken.sign(
    { id: user._id, userName: user.userName },
    process.env.TOKEN_SECRET,
    { expiresIn: 3600 }
  );
  console.log(token);
  return res.status(400).json({
    status: 'success',
    token,
  });
});

module.exports = {
  signIn,
};
