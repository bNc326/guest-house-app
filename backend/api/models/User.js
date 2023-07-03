import mongoose from "mongoose";
const { Schema } = mongoose;

export const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
