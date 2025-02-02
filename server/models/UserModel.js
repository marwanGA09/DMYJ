const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User should have name'],
      trim: true,
      lowercase: true,
    },
    userName: {
      type: String,
      unique: [true, 'find another name, this is used by other user'],
      required: [true, 'user should have user name'],
    },
    phone: {
      type: String,
      required: [true, 'user should have phone number'],
      // DON'T FORGET REMOVING BELLOW COMMENT
      // unique: [true, 'this phone is used by other user'],
      // remove this default
      default: '1234567890',
    },
    sector: {
      type: String,
      default: 'economy',
    },
    role: {
      type: String,
      enum: ['administer', 'admin', 'staff'],
      default: 'staff',
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  console.log('save');
  if (this.isNew || this.isModified('password')) {
    console.log('password before hashing', this.password);
    this.password = await bcrypt.hash(this.password, 12);
    console.log('password after hashing', this.password);
  }
  next();
});

// SCHEMA METHOD
userSchema.methods.checkPassword = async function (
  password,
  encryptedPassword
) {
  return await bcrypt.compare(password, encryptedPassword);
};
// The unique constraint doesn’t directly provide custom error messages like the required validation does. To customize the error message for unique validation, you’ll need to handle it in your error-handling middleware or use a plugin like mongoose-unique-validator.

// USE mongooseUniqueValidator instead of custom error handling inside errorhandler middle ware

userSchema.plugin(mongooseUniqueValidator, {
  message: '{PATH} is already in use. Please choose another one.',
});

const User = mongoose.model('User', userSchema);

module.exports = User;
