const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Wallet = require('./wallet.model')
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\']+(\.[^<>()\[\]\.,;:\s@\']+)*)|(\'.+\'))@(([^<>()[\]\.,;:\s@\']+\.)+[^<>()[\]\.,;:\s@\']{2,})$/i;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name needs at last 3 chars'],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required'],
    minlength: [3, 'Lastname needs at last 3 chars'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [EMAIL_PATTERN, 'Email is invalid']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password min length is 8']
  },
  avatar: {
    type: String,
    default: '../public/images/default-user-avatar.png',
    trim: true
  },
  phone: String,
  bio: String,
},{ timestamps: true, toJSON: { virtuals: true } });

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 10)
      .then((hash) => {
        this.password = hash
        next()
      })
      .catch(next)
  } else {
    next()
  }
})

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

userSchema.virtual("wallet", {
  ref: "Wallet",
  localField: "_id",
  foreignField: "user",
});

const User = mongoose.model('User', userSchema);

module.exports = User;