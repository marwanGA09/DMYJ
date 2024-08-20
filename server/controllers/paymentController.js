// Do not forget fixing status code of all response

const PaymentModel = require('../models/paymentModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/ApiFeatures');

const getAllPayments = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    PaymentModel.find()
      .populate('memberId', 'name bookNumber')
      .populate('userId', 'name userName sector'),
    req.query
  )
    .filter()
    .sort('createdAt -monthlyPaymentAmount')
    .field('-__v -updatedAt');

  const payments = await features.query;
  return res.status(200).json({
    status: 'success',
    totalResults: payments.length,
    data: {
      payments,
    },
  });
});
const createPayments = catchAsync(async (req, res, next) => {
  const newPayment = await PaymentModel.create(req.body);
  return res.status(200).json({
    status: 'success',
    data: {
      payment: newPayment,
    },
  });
});
const getPaymentById = catchAsync(async (req, res, next) => {
  const payment = await PaymentModel.findById(req.params.id);

  if (!payment) {
    return next(
      new AppError(`No payment is found with this id: ${req.params.id}`, 404)
    );
  }
  return res.status(200).json({
    status: 'success',
    data: {
      payment,
    },
  });
});
const updatePayment = catchAsync(async (req, res, next) => {
  const newPayment = await PaymentModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!newPayment) {
    return next(
      new AppError(`No payment is found with this id: ${req.params.id}`, 404)
    );
  }
  return res.status(200).json({
    status: 'success',
    data: {
      payment: newPayment,
    },
  });
});
const deletePayment = catchAsync(async (req, res, next) => {
  const deletedPayment = await PaymentModel.findByIdAndDelete(req.params.id);

  if (!deletedPayment) {
    return next(
      new AppError(`No member is found with this id: ${req.params.id}`, 404)
    );
  }
  return res.status(200).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getAllPayments,
  createPayments,
  updatePayment,
  deletePayment,
  getPaymentById,
};
