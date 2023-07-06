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
router.post("/", sendHotels);
router.get("/:id", getOneHotels);
router.put("/:id", editHotels);
router.delete("/:id", deleteHotels);

export default router;
