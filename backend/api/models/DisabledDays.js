import mongoose from "mongoose";

export const DisabledDaysSchema = new mongoose.Schema(
  {
    startDate: Date,
    endDate: Date,
    admin: String,
  },
  { timestamps: true }
);
