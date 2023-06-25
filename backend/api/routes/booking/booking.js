import express from "express";
import {
  sendBookedDate,
  getBookedDate,
  deleteBookedDate,
  editBookedDate,
  getOneBookedDate,
  deleteManyBookedDate,
} from "../../controllers/booking/booking.js";
const router = express.Router();

router.get("/", getBookedDate);
router.post("/", sendBookedDate);
router.delete("/", deleteManyBookedDate);
router.get("/:id", getOneBookedDate);
router.put("/:id", editBookedDate);
router.delete("/:id", deleteBookedDate);

export default router;
