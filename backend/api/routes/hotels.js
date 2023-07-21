import express from "express";
import {
  getHotels,
  createHotel,
  getHotel,
  deleteHotel,
  editHotel,
} from "../controllers/hotels.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/", getHotels);
router.post("/", verifyToken, createHotel);
router.get("/:id", getHotel);
router.put("/:id", verifyToken, editHotel);
router.delete("/:id", verifyToken, deleteHotel);

export default router;
