import express from "express";
import {
  getDisabledDays,
  getOneDisabledDays,
  sendDisabledDays,
  deleteManyDisabledDays,
  deleteDisabledDays,
  editDisabledDays,
} from "../controllers/disabledDays.js";
const router = express.Router();

router.get("/", getDisabledDays);
router.post("/", sendDisabledDays);
router.delete("/", deleteManyDisabledDays);
router.get("/:id", getOneDisabledDays);
router.put("/:id", editDisabledDays);
router.delete("/:id", deleteDisabledDays);

export default router;
