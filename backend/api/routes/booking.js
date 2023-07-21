import express from "express";
import {
  createBookedDate,
  getBookedDates,
  editBookedDate,
  getBookedDate,
  deleteBookedDates,
  setStatusBookedDate
} from "../controllers/booking.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/", getBookedDates);
router.post("/", createBookedDate);
router.delete("/", verifyToken, deleteBookedDates);
router.get("/:id", getBookedDate);
router.put("/:id", verifyToken, editBookedDate);
router.patch("/:id", verifyToken, setStatusBookedDate)

export default router;
