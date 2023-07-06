import express from "express";
import {
  sendBookedDate,
  getBookedDate,
  deleteBookedDate,
  editBookedDate,
  getOneBookedDate,
  deleteManyBookedDate,
} from "../../controllers/booking/booking.js";
import { verifyToken } from "../../utils/verifyToken.js";
const router = express.Router();

router.get("/", getBookedDate);
router.post("/", sendBookedDate);
router.delete("/", verifyToken, deleteManyBookedDate);
router.get("/:id", getOneBookedDate);
router.put("/:id", verifyToken, editBookedDate);
router.delete("/:id", verifyToken, deleteBookedDate);

export default router;
