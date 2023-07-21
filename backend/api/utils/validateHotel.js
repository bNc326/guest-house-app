import { createError } from "./error.js";
import { Hotel } from "../models/Hotels.js";

export const validateHotel = async (req, res, next) => {
  const hotel = req.query.hotel;

  if (!hotel) {
    next(createError(400, "A hotel paramétert kötelező megadni!"));
  }

  try {
    const result = await Hotel.findOne({ _id: hotel });

    if (!result) {
      next(createError(404, "Adj meg egy valós hotel paramétert!"));
    }

    req.hotel = hotel;
    next();
  } catch (err) {
    next(err);
  }
};
