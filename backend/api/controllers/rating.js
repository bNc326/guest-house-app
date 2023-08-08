import { Rating } from "../models/Rating.js";
import { Hotel } from "../models/Hotels.js";
import { getIo } from "../../socket.js";

const handleUpdateRatings = (hotel, id, body) => {
  const findRating = hotel.ratings.find(
    (rating) => rating._id.valueOf() === id
  );
  findRating.rating = body.rating ? body.rating : findRating.rating;
  findRating.status = body.status ? body.status : findRating.status;
  hotel.save();
};

const handleDeleteRatings = (hotel, ids) => {
  ids.map((id) => {
    const index = hotel.ratings.findIndex(
      (rating) => rating._id.valueOf() === id
    );
    if (index !== -1) {
      hotel.ratings = [
        ...hotel.ratings.slice(0, index),
        ...hotel.ratings.slice(index + 1),
      ];
    }
  });
  hotel.save();
};

export const getRatings = async (req, res, next) => {
  try {
    const result = await Rating.find({ hotel: req.hotel }).sort({
      createdAt: -1,
    });
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const getRating = async (req, res, next) => {
  try {
    const result = await Rating.findById({ _id: req.params.id });
    if (result === null) {
      res.status(404).json({
        success: false,
        status: 404,
        message: `Nem található a ${req.params.id} azonosítójú értékelés!`,
        id: req.params.id,
      });
      return;
    }
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const createRating = async (req, res, next) => {
  try {
    const newRating = new Rating(req.body);
    newRating.hotel = req.hotel;
    await newRating.save();
    getIo().emit(`${req.hotel}-ratings`, {
      action: "new",
      payload: newRating,
    });
    try {
      const rating = {
        _id: newRating._id,
        rating: newRating.rating,
        status: newRating.status,
      };
      await Hotel.findByIdAndUpdate(req.hotel, {
        $push: { ratings: rating },
      });
      res.status(201).json({
        success: true,
        status: 201,
        message: `Köszönjük az értékelésed! Sokat jelent számunkra hogy szántál ránk 2 percet!`,
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteRatings = async (req, res, next) => {
  try {
    await Rating.deleteMany({ _id: { $in: req.body } });
    getIo().emit(`${req.hotel}-ratings`, {
      action: "delete",
      payload: req.body,
    });
    try {
      const hotel = await Hotel.findById(req.hotel);
      handleDeleteRatings(hotel, req.body);
      res.status(201).json({
        success: true,
        status: 201,
        message: "Sikeresen törölted az értékelést/eket!",
        id: req.body,
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const editRating = async (req, res, next) => {
  try {
    const updateRating = await Rating.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    const updateBody = req.body;
    req.body._id = updateRating._id;
    getIo().emit(`${req.hotel}-ratings`, {
      action: "update",
      payload: updateBody,
    });
    try {
      const hotel = await Hotel.findById(req.hotel);
      handleUpdateRatings(hotel, req.params.id, req.body);

      res.status(201).json({
        success: true,
        status: 201,
        message: `Sikeresen szerkesztetted a ${req.params.id} azonosítójú értékelést!`,
        admin: req.body.admin,
        id: req.params.id,
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
