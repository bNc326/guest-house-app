import { Rating } from "../models/Rating.js";

export const getRating = async (req, res, next) => {
  try {
    const result = await Rating.find();
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const getOneRating = async (req, res, next) => {
  try {
    const result = await Rating.findOne({ _id: req.params.id });
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const sendRating = async (req, res, next) => {
  try {
    const newHotels = new Rating(req.body);
    await newHotels.save();

    res.status(201).json({
      success: true,
      status: 201,
      message: `Köszönjük értékelését! Adminisztrátor jóváhagyására vár! Részleteket elküldtük emailben!`,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteManyRating = async (req, res, next) => {
    try {
      await Rating.deleteMany({ _id: { $in: req.body } });
      res.status(201).json({
        success: true,
        status: 201,
        message: "Sikeresen törölted az értékeléseket!",
        id: req.body,
      });
    } catch (err) {
      next(err);
    }
  };

export const deleteRating = async (req, res, next) => {
  try {
    await Rating.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      status: 201,
      message: `Sikeresen törölted a ${req.params.id} azonosítójú értékelést!`,
      admin: req.body.admin,
      id: req.params.id,
    });
  } catch (err) {
    next(err);
  }
};

export const editRating = async (req, res, next) => {
  try {
    await Hotels.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(201).json({
      success: true,
      status: 201,
      message: `Sikeresen szerkesztetted a ${req.params.id} azonosítójú értékelést!`,
      admin: req.body.admin,
      id: req.params.id,
    });
  } catch (err) {
    next(err);
  }
};
