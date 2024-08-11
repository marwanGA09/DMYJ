const UserModel = require('./../models/UserModel');

const getAllUsers = (req, res, next) => {
  console.log('getAll user');
  return res.status(200).json({ status: 'success' });
};

const getUserById = (req, res, next) => {
  console.log('create user by id', req.params.id);
  return res.status(200).json({ status: 'success' });
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
