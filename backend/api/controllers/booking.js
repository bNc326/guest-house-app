import { Booking } from "../models/Booking.js";
import { Hotel } from "../models/Hotels.js";

const handleUpdateStatus = (hotel, id, status) => {
  const updateHotel = hotel.bookedDates.find(
    (date) => date._id.valueOf() === id
  );
  updateHotel.status = status;
  hotel.save();
};

const handleUpdateBookedDates = (hotel, id, body) => {
  const findBookedDate = hotel.bookedDates.find((date) => date._id.valueOf() === id);
  findBookedDate.startDate = body.startDate;
  findBookedDate.endDate = body.endDate;
  findBookedDate.status = body.status;
  hotel.save();
};

const handleDeleteBookedDates = (hotel, ids) => {
  ids.map((id) => {
    const index = hotel.bookedDates.findIndex(
      (date) => date._id.valueOf() === id
    );
    if (index !== -1) {
      hotel.bookedDates = [
        ...hotel.bookedDates.slice(0, index),
        ...hotel.bookedDates.slice(index + 1),
      ];
    }
  });
  hotel.save();
};

export const getBookedDates = async (req, res, next) => {
  try {
    const result = await Booking.find({ hotel: req.hotel }).sort({
      createdAt: -1,
    });
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const getBookedDate = async (req, res, next) => {
  try {
    const result = await Booking.findById({ _id: req.params.id });
    if (result === null) {
      res.status(404).json({
        success: false,
        status: 404,
        message: `Nem található a ${req.params.id} azonosítójú foglalás!`,
        id: req.params.id,
      });
      return;
    }
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const createBookedDate = async (req, res, next) => {
  try {
    const newBooking = new Booking(req.body);
    newBooking.hotel = req.hotel;
    await newBooking.save();
    try {
      const bookedDate = {
        _id: newBooking._id,
        startDate: newBooking.startDate,
        endDate: newBooking.endDate,
        status: newBooking.status,
      };

      await Hotel.findByIdAndUpdate(req.hotel, {
        $push: { bookedDates: bookedDate },
      });

      res.status(201).json({
        success: true,
        status: 201,
        message: `A foglalás adminisztrátor általi jóváhagyásra vár!`,
        id: newBooking._id.valueOf(),
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteBookedDates = async (req, res, next) => {
  try {
    await Booking.deleteMany({ _id: { $in: req.body } });
    try {
      const hotel = await Hotel.findById(req.hotel);
      handleDeleteBookedDates(hotel, req.body);

      res.status(201).json({
        success: true,
        status: 201,
        message: "Sikeresen törölted a foglalást/okat!",
        id: req.body,
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const editBookedDate = async (req, res, next) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    try {
      const hotel = await Hotel.findById(req.hotel);
      handleUpdateBookedDates(hotel, req.params.id, req.body);

      res.status(201).json({
        success: true,
        status: 201,
        message: `Sikeresen szerkesztetted a ${req.params.id} azonosítójú foglalást!`,
        id: req.params.id,
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const setStatusBookedDate = async (req, res, next) => {
  try {
    await Booking.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { status: req.body.status },
      }
    );
    try {
      const hotel = await Hotel.findById({ _id: req.hotel }).select(
        "bookedDates"
      );

      handleUpdateStatus(hotel, req.params.id, req.body.status);

      res.status(201).json({
        success: true,
        status: 201,
        message: `Sikeresen elfogadtad/elutatsítottad a foglalást/okat!`,
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
