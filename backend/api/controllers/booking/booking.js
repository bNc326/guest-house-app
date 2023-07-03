import { BookingDynamic } from "../../utils/dynamicDbCollections.js";
export const getBookedDate = async (req, res, next) => {
  try {
    const Booking = BookingDynamic(req.hotelParams)
    const result = await Booking.find().sort({ createdAt: -1 });
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const getOneBookedDate = async (req, res, next) => {
  try {
    const Booking = BookingDynamic(req.hotelParams)
    const result = await Booking.findOne({ _id: req.params.id });
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

export const sendBookedDate = async (req, res, next) => {
  try {
    const Booking = BookingDynamic(req.hotelParams)
    const newBookedDate = new Booking(req.body);
    await newBookedDate.save();

    res.status(201).json({
      success: true,
      status: 201,
      message: `Köszönjük a foglalást! Adminisztrátór általi jóváhagyásra vár! Részleteken elküldtük emailben!`,
      id: req.params.id,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteManyBookedDate = async (req, res, next) => {
  try {
    const Booking = BookingDynamic(req.hotelParams)
    await Booking.deleteMany({ _id: { $in: req.body } });
    res.status(201).json({
      success: true,
      status: 201,
      message: "Sikeresen törölted a foglalást/okat!",
      id: req.body,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBookedDate = async (req, res, next) => {
  try {
    const Booking = BookingDynamic(req.hotelParams)
    await Booking.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      status: 201,
      message: `Sikeresen törölted a ${req.params.id} azonosítójú foglalást!`,
      id: req.params.id,
    });
  } catch (err) {
    next(err);
  }
};

export const editBookedDate = async (req, res, next) => {
  try {
    const Booking = BookingDynamic(req.hotelParams)
    await Booking.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(201).json({
      success: true,
      status: 201,
      message: `Sikeresen szerkesztetted a ${req.params.id} azonosítójú foglalást!`,
      id: req.params.id,
    });
  } catch (err) {
    next(err);
  }
};
