import mongoose from "mongoose";

export const BookingSchema = new mongoose.Schema(
  {
    startDate: Date,
    endDate: Date,
    nightAmount: Number,
    personsAmount: Number,
    price: {
      EUR: Number,
      HUF: Number,
    },
    costumer: {
      name: String,
      email: String,
      phone: String,
      address: {
        country: String,
        postalCode: Number,
        city: String,
        street: String,
      },
    },
    status: String,
  },
  { timestamps: true }
);