import mongoose from "mongoose";

const DisabledDaysSchema = new mongoose.Schema(
  {
    startDate: Date,
    endDate: Date,
    admin: String,
  },
  { timestamps: true }
);

export const DisabledDays = mongoose.model("disabled-days", DisabledDaysSchema);
