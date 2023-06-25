import { DisabledDays } from "../models/DisabledDays.js";

export const getDisabledDays = async (req, res, next) => {
  try {
    const result = await DisabledDays.find().sort({ createdAt: -1 });
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const getOneDisabledDays = async (req, res, next) => {
  try {
    const result = await DisabledDays.findOne({ _id: req.params.id });
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const sendDisabledDays = async (req, res, next) => {
  try {
    const newDisabledDays = new DisabledDays(req.body);
    await newDisabledDays.save();

    res.status(201).json({
      success: true,
      status: 201,
      message: `Sikeresen létrehoztad a kizárt napot!`,
      admin: req.body.admin,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteManyDisabledDays = async (req, res, next) => {
  try {
    await DisabledDays.deleteMany({ _id: { $in: req.body } });
    res.status(201).json({
      success: true,
      status: 201,
      message: "Sikeresen törölted a kizárt napot/okat!",
      id: req.body,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteDisabledDays = async (req, res, next) => {
  try {
    await DisabledDays.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      status: 201,
      message: `Sikeresen törölted a ${req.params.id} azonosítójú kizárt napot!`,
      admin: req.body.admin,
      id: req.params.id,
    });
  } catch (err) {
    next(err);
  }
};

export const editDisabledDays = async (req, res, next) => {
  try {
    await DisabledDays.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(201).json({
      success: true,
      status: 201,
      message: `Sikeresen szerkesztetted a ${req.params.id} azonosítójú kizárt napot!`,
      admin: req.body.admin,
      id: req.params.id,
    });
  } catch (err) {
    next(err);
  }
};
