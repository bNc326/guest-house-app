import { createError } from "./error";
import { Hotels } from "../models/Hotels";
import { BookingSchema } from "../models/Booking.js";
import { DisabledDaysSchema } from "../models/DisabledDays.js";
import { RatingSchema } from "../models/Rating.js";
import mongoose from "mongoose";

export const validateHotel = async (req, res, next) => {
  const hotelParams = req.query.hotel;

  if (!hotelParams) {
    next(createError(400, "A hotel paramétert kötelező megadni!"));
  }

  try {
    const result = await Hotels.findOne({ hotelUUID: hotelParams });

    if (!result) {
      next(createError(404, "Adj meg egy valós hotel paramétert!"));
    }

    req.hotelParams = hotelParams;
    next();
  } catch (err) {
    next(err);
  }
};
