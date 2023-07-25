import express from "express";
import {
  getRatings,
  createRating,
  getRating,
  editRating,
  deleteRatings,
} from "../controllers/rating.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/", getRatings);
router.post("/", createRating);
router.delete("/", verifyToken, deleteRatings);
router.get("/:id", getRating);
router.put("/:id", verifyToken, editRating);

export default router;
