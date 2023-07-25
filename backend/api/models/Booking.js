import mongoose from "mongoose";

export const BookingSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    nightAmount: {
      type: Number,
      required: true,
    },
    personsAmount: {
      type: Number,
      required: true,
    },
    EUR: {
      type: Number,
      required: true,
    },
    HUF: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
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
    status: {
      type: String,
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

export const Booking = mongoose.model("bookings", BookingSchema);
