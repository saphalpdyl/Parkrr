import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String
  },
  middleName: String,
  username: {
    type: String,
    unique: true,
  },
  refreshToken: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordResetToken: String,
});

const User = mongoose.model('User', userSchema);

export default User;