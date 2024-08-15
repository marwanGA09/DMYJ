const APIFeatures = require('../utils/ApiFeatures');
const catchAsync = require('../utils/catchAsync');
const MemberModel = require('./../models/memberModel');

const getAllMembers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(MemberModel.find(), req.query)
    .filter()
    .sort()
    .field();

  const members = await features.query;
  return res.status(200).json({
    status: 'success',
    totalResult: members.length,
    data: {
      members,
    },
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
