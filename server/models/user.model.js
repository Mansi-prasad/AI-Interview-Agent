import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },
    password: {
      type: String,
      select: false,
      minlength: 8,
      default: undefined,
    },

    credits: { type: Number, default: 100, min: 0 },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
