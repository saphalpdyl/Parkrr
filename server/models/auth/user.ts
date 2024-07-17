import mongoose from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  middleName?: string;
  refreshToken?: string;
  isActive?: boolean;
  password: string;
  passwordResetToken?: string;
  username: string;
  lastLogin?: number;
}

const userSchema = new mongoose.Schema<IUser>({
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
  lastLogin: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model('User', userSchema);

export default User;