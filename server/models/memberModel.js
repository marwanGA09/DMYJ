const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'member should have name'],
      trim: true,
      lowercase: true,
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'every member should have sex data'],
    },
    bookNumber: {
      type: Number,
      required: [true, 'Every member should have bookNumber Code'],
      unique: [true, 'every member should have unique bookNumber'],
    },
    profession: {
      type: String,
    },
    address: {
      type: String,
      required: [true, 'member should have address'],
    },
    phone: {
      type: String,
      minlength: 10,
      required: [true, 'Member should have phone number'],
      // DON'T FORGET REMOVING BELLOW COMMENT
      // unique: [true, 'this phone is used by other member'],
    },
    email: { type: String },
    membershipPaymentAmount: {
      type: Number,
      min: 10,
      required: [true, 'member should have membershipPaymentAmount'],
    },
    profileImage: {
      type: String,
      default: 'default-profile-image',
    },
    createdByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Should have userId created this member'],
    },
    signedDate: {
      type: Date,
      default: Date.now,
    },
    dateOfBirth: {
      type: Date,
    },
    note: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

memberSchema.plugin(mongooseUniqueValidator, {
  message: '{PATH} is already in use. Please choose another one.',
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
