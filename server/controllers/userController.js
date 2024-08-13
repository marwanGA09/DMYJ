const catchAsync = require('../utils/catchAsync');
const UserModel = require('./../models/UserModel');

const getAllUsers = catchAsync(async (req, res, next) => {
  console.log('getAll user');
  console.log(req.query);
  const query = UserModel.find().sort('role name').select('-__v -updatedAt');
  const users = await query;
  return res.status(200).json({ status: 'success', data: { users } });
});

const getUserById = catchAsync(async (req, res, next) => {
  console.log('get user by id', req.params.id);
  const query = UserModel.findById(req.params.id).select('-__v -updatedAt');
  const user = await query;
  return res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
const createUser = catchAsync(async (req, res, next) => {
  const { name, userName, sector, role, password } = req.body;

  console.log(name, userName, sector, role, password);

  const user = await new UserModel({
    name,
    userName,
    sector,
    role,
    password,
  }).save();
  console.log(user);
  return res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

module.exports = { getAllUsers, createUser, getUserById };
