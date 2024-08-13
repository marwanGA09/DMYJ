const UserModel = require('./../models/UserModel');

const getAllUsers = async (req, res, next) => {
  try {
    console.log('getAll user');
    console.log(req.query);
    const query = UserModel.find().sort('role name').select('-__v -updatedAt');
    const users = await query;
    return res.status(200).json({ status: 'success', data: { users } });
  } catch (err) {
    return res.status(404).json({
      status: 'failure',
      error: 'no Users data',
    });
  }
};

const getUserById = async (req, res, next) => {
  try {
    console.log('get user by id', req.params.id);
    const query = UserModel.findById(req.params.id).select('-__v -updatedAt');
    const user = await query;
    return res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'failure',
      error: 'no user with given id',
    });
  }
};
const createUser = async (req, res, next) => {
  try {
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
  } catch (error) {
    res.status(401).json({ status: 'failure', error: { error } });
  }
};

module.exports = { getAllUsers, createUser, getUserById };
