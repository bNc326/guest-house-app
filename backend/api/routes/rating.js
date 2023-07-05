import express from "express";
import {
  getRating,
  sendRating,
  getOneRating,
  editRating,
  deleteRating,
  deleteManyRating,
} from "../controllers/rating.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/", getRating);
router.post("/", sendRating);
router.delete("/", verifyToken, deleteManyRating);
router.get("/:id", getOneRating);
router.put("/:id", verifyToken, editRating);
router.delete("/:id", verifyToken, deleteRating);

export default router;
