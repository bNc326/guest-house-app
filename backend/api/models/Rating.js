import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
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

export const Rating = mongoose.model("Rating", RatingSchema);
