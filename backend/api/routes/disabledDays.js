import express from "express";
import {
  getDisabledDays,
  getDisabledDay,
  createDisabledDay,
  deleteDisabledDays,
  editDisabledDay,
} from "../controllers/disabledDays.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/", getDisabledDays);
router.post("/", createDisabledDay);
router.delete("/", verifyToken, deleteDisabledDays);
router.get("/:id", verifyToken, getDisabledDay);
router.put("/:id", verifyToken,  editDisabledDay);

export default router;
