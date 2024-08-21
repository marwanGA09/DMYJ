const APIFeatures = require('../utils/ApiFeatures');
const catchAsync = require('../utils/catchAsync');
const MemberModel = require('./../models/memberModel');
const AppError = require('./../utils/AppError');
const getAllMembers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    MemberModel.find().populate('userId', 'name userName sector'),
    req.query
  )
    .filter()
    .sort('name -signedDate')
    .field('-__v -updatedAt');

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
  const member = await MemberModel.findById(req.params.id);

  if (!member) {
    return next(
      new AppError(`No member is found with this id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      member,
    },
  });
});

const createMember = catchAsync(async (req, res, next) => {
  const newMember = await MemberModel.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      member: newMember,
    },
  });
});

const updateMember = catchAsync(async (req, res, next) => {
  const updated = await MemberModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return next(
      new AppError(`No member is found with this id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      member: updated,
    },
  });
});

// DEVELOPMENTAL
const updateMemberAll = catchAsync(async (req, res, next) => {
  const updated = await MemberModel.updateMany({}, {});

  res.status(200).json({
    status: 'success',
    data: {
      member: updated,
    },
  });
});

const deleteMember = catchAsync(async (req, res, next) => {
  const deleteMem = await MemberModel.findByIdAndDelete(req.params.id);

  if (!deleteMem) {
    return next(
      new AppError(`No member is found with this id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getAllMembers,
  getMemberByID,
  createMember,
  updateMember,
  deleteMember,
  updateMemberAll,
};
