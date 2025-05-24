import bcrypt from 'bcryptjs';
import { check } from 'express-validator';
import mongoose from 'mongoose';

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

export const userRegisterValidationSchema = [
  check('firstName', 'First name is required').isString().not().isEmpty(),
  check('lastName', 'Last name is required').isString().not().isEmpty(),
  check('email', 'Email is required').isEmail().not().isEmpty(),
  check('password', 'Password with 6 or more characters required').isLength({
    min: 6,
  }),
];

export const userLoginValidationSchema = [
  check('email', 'Email is required').isEmail().not().isEmpty(),
  check('password', 'Password with 6 or more characters required').isLength({
    min: 6,
  }),
];

const User = mongoose.model<UserType>('User', userSchema);

export default User;
