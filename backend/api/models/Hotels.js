import mongoose from "mongoose";

export const HotelsSchema = new mongoose.Schema({
  hotelName: String,
  hotelUUID: String,
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
