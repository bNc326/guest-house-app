import mongoose from "mongoose";

export const HotelsSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    NTAK: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    roomAmount: {
      type: Number,
      required: true,
    },
    maxPersonAmount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    services: {
      type: [String],
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    bookedDates: {
      type: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, ref: "bookings" },
          startDate: { type: Date, required: true },
          endDate: { type: Date, required: true },
          status: { type: String, required: true },
        },
      ],
      required: true,
    },
    disabledDays: {
      type: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, ref: "disabled-days" },
          startDate: { type: Date, required: true },
          endDate: { type: Date, required: true },
        },
      ],
      required: true,
    },
    ratings: {
      type: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, ref: "ratings" },
          rating: { type: Number, min: 0, max: 5, required: true },
          status: { type: String, required: true },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export const Hotel = mongoose.model("hotels", HotelsSchema);
