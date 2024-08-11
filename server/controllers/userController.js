const getAllUsers = (req, res, next) => {
  console.log('getAll user');
  return res.status(200).json({ status: 'success' });
};

const getUserById = (req, res, next) => {
  console.log('create user by id', req.params.id);
  return res.status(200).json({ status: 'success' });
};
const createUser = (req, res, next) => {
  console.log('create, user');
  return res.status(300).json({
    status: 'success',
  });
};

module.exports = { getAllUsers, createUser, getUserById };
