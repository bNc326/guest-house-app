import express from "express";
import { getRating, sendRating, getOneRating, editRating, deleteRating, deleteManyRating } from "../controllers/rating.js";
const router = express.Router();

router.get("/", getRating);
router.post("/", sendRating);
router.delete("/", deleteManyRating);
router.get("/:id", getOneRating);
router.put("/:id", editRating);
router.delete("/:id", deleteRating);

export default router;
