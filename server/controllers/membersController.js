const catchAsync = require('../utils/catchAsync');

const getAllMembers = catchAsync(async (req, res, next) => {
  console.log('get all members');
  return res.status(200).json({
    status: 'success',
  });
});

const getMemberByID = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  res.status(200).json({
    status: 'success',
  });
});

const createMember = catchAsync(async (req, res, next) => {
  console.log('create Member');
  console.log();
  res.status(200).json({
    status: 'success',
  });
});

const updateMember = catchAsync(async (req, res, next) => {
  console.log('update member');
  res.status(200).json({
    status: 'success',
  });
});

const deleteMember = catchAsync(async (req, res, next) => {
  console.log('delete member');
  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  getAllMembers,
  getMemberByID,
  createMember,
  updateMember,
  deleteMember,
};
