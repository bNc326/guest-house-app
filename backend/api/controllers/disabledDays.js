import { DisabledDays } from "../models/DisabledDays.js";
import { Hotel } from "../models/Hotels.js";
import { getIo } from "../../socket.js";

const handleUpdateBookedDates = (hotel, id, body) => {
  const findDisabledDay = hotel.disabledDays.find(
    (date) => date._id.valueOf() === id
  );
  findDisabledDay.startDate = body.startDate
    ? body.startDate
    : findDisabledDay.startDate;
  findDisabledDay.endDate = body.endDate
    ? body.endDate
    : findDisabledDay.endDate;
  hotel.save();
};

const handleDeleteDisabledDays = (hotel, ids) => {
  ids.map((id) => {
    const index = hotel.disabledDays.findIndex(
      (date) => date._id.valueOf() === id
    );
    if (index !== -1) {
      hotel.disabledDays = [
        ...hotel.disabledDays.slice(0, index),
        ...hotel.disabledDays.slice(index + 1),
      ];
    }
  });
  hotel.save();
};

export const getDisabledDays = async (req, res, next) => {
  try {
    const result = await DisabledDays.find({ hotel: req.hotel }).sort({
      createdAt: -1,
    });
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const getDisabledDay = async (req, res, next) => {
  try {
    const result = await DisabledDays.findById({ _id: req.params.id });
    if (result === null) {
      res.status(404).json({
        success: false,
        status: 404,
        message: `Nem található a ${req.params.id} azonosítójú kizárt nap!`,
        id: req.params.id,
      });
      return;
    }
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const createDisabledDay = async (req, res, next) => {
  try {
    const newDisabledDay = new DisabledDays(req.body);
    newDisabledDay.hotel = req.hotel;
    await newDisabledDay.save();
    getIo().emit(`${req.hotel}-disabled-days`, {
      action: "new",
      payload: newDisabledDay,
    });
    try {
      const disabledDay = {
        _id: newDisabledDay._id,
        startDate: newDisabledDay.startDate,
        endDate: newDisabledDay.endDate,
      };
      await Hotel.findByIdAndUpdate(req.hotel, {
        $push: { disabledDays: disabledDay },
      });
      res.status(201).json({
        success: true,
        status: 201,
        message: `Sikeresen létrehoztad a kizárt napot!`,
        admin: req.body.admin,
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteDisabledDays = async (req, res, next) => {
  try {
    await DisabledDays.deleteMany({ _id: { $in: req.body } });
    getIo().emit(`${req.hotel}-disabled-days`, {
      action: "delete",
      payload: req.body,
    });
    try {
      const hotel = await Hotel.findById(req.hotel);
      handleDeleteDisabledDays(hotel, req.body);

      res.status(201).json({
        success: true,
        status: 201,
        message: "Sikeresen törölted a kizárt napot/okat!",
        id: req.body,
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const editDisabledDay = async (req, res, next) => {
  try {
    const updateDisabledDay = await DisabledDays.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      }
    );
    const updateBody = req.body;
    req.body._id = updateDisabledDay._id;
    getIo().emit(`${req.hotel}-disabled-days`, {
      action: "update",
      payload: updateBody,
    });
    try {
      const hotel = await Hotel.findById(req.hotel);
      handleUpdateBookedDates(hotel, req.params.id, req.body);

      res.status(201).json({
        success: true,
        status: 201,
        message: `Sikeresen szerkesztetted a ${req.params.id} azonosítójú kizárt napot!`,
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
