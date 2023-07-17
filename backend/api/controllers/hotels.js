import { Hotels } from "../models/Hotels.js";
import { v4 as uuid } from "uuid";
import {
  BookingDynamic,
  DisabledDayDynamic,
  RatingDynamic,
} from "../utils/dynamicDbCollections.js";
import mongoose from "mongoose";

export const getHotels = async (req, res, next) => {
  try {
    const result = await Hotels.find();
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const getOneHotels = async (req, res, next) => {
  try {
    const result = await Hotels.findOne({ _id: req.params.id });
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const sendHotels = async (req, res, next) => {
  try {
    const body = req.body;
    if (typeof body.hotelName === "string") {
      const name = body.hotelName.toLowerCase().replaceAll(/\s/g, "-");
      const uniqueId = uuid().split("-")[0];
      body.hotelUUID = `${uniqueId}-${name}`;
    }

    BookingDynamic(body.hotelUUID).createCollection();
    DisabledDayDynamic(body.hotelUUID).createCollection();
    RatingDynamic(body.hotelUUID).createCollection();

    const newHotels = new Hotels(body);
    await newHotels.save();

    res.status(201).json({
      success: true,
      status: 201,
      message: `Sikeresen létrehoztad a ${req.body.hotelName} nevű vendégházat!`,
      admin: req.body.admin,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteHotels = async (req, res, next) => {
  try {
    const dropCollections = (uuid) => {
      mongoose.connection.db.dropCollection(`${uuid}-bookings`);
      mongoose.connection.db.dropCollection(`${uuid}-disabled-days`);
      mongoose.connection.db.dropCollection(`${uuid}-ratings`);
    };
    const hotel = await Hotels.findByIdAndDelete(req.params.id);
    dropCollections(hotel.hotelUUID);
    res.status(201).json({
      success: true,
      status: 201,
      message: `Sikeresen törölted a ${hotel.hotelName} nevű vendégházat!`,
      admin: req.body.admin,
      id: req.params.id,
    });
  } catch (err) {
    next(err);
  }
};

export const editHotels = async (req, res, next) => {
  try {
    await Hotels.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(201).json({
      success: true,
      status: 201,
      message: `Sikeresen szerkesztetted a ${req.body.hotelName} nevű vendégházat!`,
      admin: req.body.admin,
      id: req.params.id,
    });
  } catch (err) {
    next(err);
  }
};
