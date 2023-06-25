import mongoose from "mongoose";

const HotelsSchema = new mongoose.Schema({
  hotelName: String,
  impressum: {
    country: String,
    postalCode: Number,
    city: String,
    street: String,
    NTAK_regNumber: String,
  },
  services: Array,
  feature: Array,
  price: Number,
  roomAmount: Number,
  maxPersonAmount: Number,
  description: String,
});

export const Hotels = mongoose.model("Hotels", HotelsSchema);
