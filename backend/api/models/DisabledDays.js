import mongoose from "mongoose";

export const DisabledDaysSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "hotels",
    },
  },
  { timestamps: true }
);

export const DisabledDays = mongoose.model("disabled-days", DisabledDaysSchema);
