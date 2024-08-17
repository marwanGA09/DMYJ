const mongoose = require('mongoose');
const AppError = require('./../utils/AppError');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const paymentSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: [true, 'payment should have memberId payed this payment'],
    },
    totalMonth: {
      type: Number,
      default: 1,
    },
    //   MONTHLY PAYMENT
    monthlyPaymentAmount: {
      type: Number,
      required: [true, 'every payment should have monthly amount'],
    },
    totalAmount: {
      type: Number,
      required: [true, 'every payment should have total amount'],
      validate: [
        function (val) {
          return val === this.totalMonth * this.monthlyPaymentAmount;
        },
        'total amount should be equal with product of totalMonth and monthlyPaymentAmount',
      ],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'every payment should have userId'],
    },
    months: [
      {
        _id: false,
        month: {
          type: String,
          required: [true, 'every payment should have month'],
          lowercase: true,
          enum: [
            'jan',
            'feb',
            'mar',
            'apr',
            'may',
            'jun',
            'jul',
            'aug',
            'sep',
            'oct',
            'nov',
            'dec',
          ], // Add validation for valid month names
        },
        year: {
          type: Number,
          required: [true, 'every payment should have year'],
        },
      },
    ],
  },
  { timestamps: true }
);

paymentSchema.plugin(mongooseUniqueValidator, {
  message: '{PATH} is already in use. Please choose another one.',
});

paymentSchema.pre('save', function (next) {
  const uniqueMonths = new Set(
    this.months.map((item) => `${item.month}-${item.year}`)
  );
  if (uniqueMonths.size !== this.months.length) {
    return next(new AppError('Months array contains duplicate entries', 400));
  }

  if (this.months.length !== this.totalMonth) {
    return next(
      new AppError('total month must be equal with months detail', 401)
    );
  } else {
    next();
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
