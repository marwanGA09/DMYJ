const express = require('express');
const {
  getAllUsers,
  createUser,
  getUserById,
} = require('./../controllers/userController');
const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUserById);

module.exports = router;
