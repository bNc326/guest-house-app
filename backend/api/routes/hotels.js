import express from "express";
import {
  getHotels,
  sendHotels,
  getOneHotels,
  deleteHotels,
  editHotels,
} from "../controllers/hotels.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/", getHotels);
router.post("/", verifyToken, sendHotels);
router.get("/:id", getOneHotels);
router.put("/:id", verifyToken, editHotels);
router.delete("/:id", verifyToken, deleteHotels);

export default router;
