import mongoose from "mongoose";

export const RatingSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: {
      normal: String,
      positive: String,
      negative: String,
    },
    rating: Number,
  },
  { timestamps: true }
);