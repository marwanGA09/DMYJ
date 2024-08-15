const catchAsync = require('../utils/catchAsync');
const MemberModel = require('./../models/memberModel');

const getAllMembers = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludeStr = ['limit', 'sort', 'field', 'page'];
  excludeStr.forEach((el) => delete queryObj[el]);
  // FILTERING
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (op) => `$${op}`);
  let query = MemberModel.find(JSON.parse(queryStr));

  // SORTING
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('name -signedDate');
  }

  // fields
  if (req.query.field) {
    const select = req.query.field.split(',').join(' ');
    query = query.select(`${select}`);
  } else {
    query = query.select('-__v -updatedAt');
  }

  const members = await query;
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
