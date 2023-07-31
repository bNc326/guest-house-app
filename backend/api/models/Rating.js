import mongoose from "mongoose";

export const RatingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    positives: { type: String },
    negatives: { type: String },
    rating: { type: Number, min: 0, max: 5, required: true },
    anonymus: {type: Boolean,},
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "hotels",
    },
  },
  { timestamps: true }
);

export const Rating = mongoose.model("ratings", RatingSchema);
