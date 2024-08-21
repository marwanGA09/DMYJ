const express = require('express');
const {
  getAllMembers,
  createMember,
  getMemberByID,
  updateMember,
  deleteMember,
  updateMemberAll,
} = require('../controllers/membersController');
const { protected } = require('./../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(protected, getAllMembers)
  .post(createMember)
  .patch(updateMemberAll);
router
  .route('/:id')
  .get(getMemberByID)
  .patch(updateMember)
  .delete(deleteMember);

module.exports = router;
