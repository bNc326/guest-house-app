import { Hotel } from "../models/Hotels.js";
import { getIo } from "../../socket.js";
export const getHotels = async (req, res, next) => {
  try {
    let result;
    const filter = req.query.filter;
    if (filter) {
      const filterArray = filter.split(",");
      let filterString = "";
      filterArray.map((text) => {
        filterString += `${text}\xa0`;
      });
      result = await Hotel.find().select(filterString);
    } else {
      result = await Hotel.find();
    }
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    let result;
    const filter = req.query.filter;
    if (filter) {
      const filterArray = filter.split(",");
      let filterString = "";
      filterArray.map((text) => {
        if (text === "booked") {
          filterString += "bookedDates\xa0";
        }
        if (text === "disabled") {
          filterString += "disabledDays\xa0";
        }
        if (text === "ratings") {
          filterString += "ratings\xa0";
        }
      });
      result = await Hotel.findOne({ _id: req.params.id }).select(
        `${filterString} -_id`
      );
    } else {
      result = await Hotel.findOne({ _id: req.params.id });
    }
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const createHotel = async (req, res, next) => {
  try {
    const newHotels = new Hotel(req.body);
    await newHotels.save();
    getIo().emit(`hotels`, {
      action: "new",
      payload: newHotels,
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: `Sikeresen létrehoztad a ${req.body.hotelName} nevű vendégházat!`,
    });
  } catch (err) {
    next(err);
  }
};
//TODO when delete all hotel then we delete all booked,disabled,ratings object
export const deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    getIo().emit(`hotels`, {
      action: "delete",
      payload: req.params.id,
    });
    res.status(201).json({
      success: true,
      status: 201,
      message: `Sikeresen törölted a ${hotel.hotelName} nevű vendégházat!`,
    });
  } catch (err) {
    next(err);
  }
};

export const editHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    const updateBody = req.body;
    req.body._id = updateHotel._id;
    getIo().emit(`hotels`, {
      action: "update",
      payload: updateBody,
    });
    res.status(201).json({
      success: true,
      status: 201,
      message: `Sikeresen szerkesztetted a ${req.body.hotelName} nevű vendégházat!`,
      id: req.params.id,
    });
  } catch (err) {
    next(err);
  }
};
