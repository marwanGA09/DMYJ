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
    profession: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, 'Member should have phone number'],
      unique: [true, 'this phone is used by other member'],
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
    note: {
      type: String,
      trim: true,
      lowercase: true,
      default: 'every thing is normal',
    },
  },
  { timestamps: true }
);

memberSchema.plugin(mongooseUniqueValidator, {
  message: '{PATH} is already in use. Please choose another one.',
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
