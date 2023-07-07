import express from "express";
import {
  getDisabledDays,
  getOneDisabledDays,
  sendDisabledDays,
  deleteManyDisabledDays,
  deleteDisabledDays,
  editDisabledDays,
} from "../controllers/disabledDays.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/", getDisabledDays);
router.post("/", sendDisabledDays);
router.delete("/", verifyToken, deleteManyDisabledDays);
router.get("/:id", verifyToken, getOneDisabledDays);
router.put("/:id", verifyToken,  editDisabledDays);
router.delete("/:id", verifyToken, deleteDisabledDays);

export default router;
