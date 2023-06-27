import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import auth from "./api/routes/auth.js";
import weather from "./api/routes/weather.js";
import Booking from "./api/routes/booking/booking.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import DisabledDays from "./api/routes/disabledDays.js";
import Hotels from "./api/routes/hotels.js";
import Rating from "./api/routes/rating.js";
import Gallery from "./api/routes/gallery.js";

const app = express();

dotenv.config();

// * connect to mongodb
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// * Middleware

const corsConf = {
  origin: "",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/store", express.static("store"));
app.get("/api/isLoaded", (req, res, next) => {
  try {
    res.status(200).send(true);
  } catch (error) {
    next(error);
  }
});
app.use("/api/auth", auth);
app.use("/api/weather", weather);
app.use("/api/booking", Booking);
app.use("/api/disabled-days", DisabledDays);
app.use("/api/hotels", Hotels);
app.use("/api/ratings", Rating);
app.use("/api/gallery", Gallery);

// * Error handling

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    status: errorStatus,
    stack: err.stack,
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to backend!");
});

app.listen(8800, () => {
  connectDB()
  console.log("Server running on port 8800")
})
