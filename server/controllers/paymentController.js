// Do not forget fixing status code of all response

const PaymentModel = require('../models/paymentModel');
const catchAsync = require('./../utils/catchAsync');

const getAllPayments = catchAsync(async (req, res, next) => {
  console.log('get all payments');
  return res.status(200).json({
    status: 'success',
  });
});
const createPayments = catchAsync(async (req, res, next) => {
  console.log('create payments');
  const newPayment = await PaymentModel.create(req.body);
  return res.status(200).json({
    status: 'success',
    data: {
      payment: newPayment,
    },
  });
});
const getPaymentById = catchAsync(async (req, res, next) => {
  console.log('get payment by id');
  console.log(req.params.id);
  return res.status(200).json({
    status: 'success',
  });
});
const updatePayment = catchAsync(async (req, res, next) => {
  console.log('update payment by id');
  console.log(req.params.id);
  return res.status(200).json({
    status: 'success',
  });
});
const deletePayment = catchAsync(async (req, res, next) => {
  console.log('delete payment by id');
  console.log(req.params.id);
  return res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  getAllPayments,
  createPayments,
  updatePayment,
  deletePayment,
  getPaymentById,
};
