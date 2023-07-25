import express from "express";
import { uploads } from "../utils/uploads.js";
import {
  getImages,
  getImage,
  editImage,
  deleteImages,
  uploadImage,
} from "../controllers/gallery.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/", getImages);
router.post("/upload", verifyToken, uploads.array("images"), uploadImage);
router.get("/:id", getImage);
router.put("/:id", verifyToken, editImage);
router.delete("/", verifyToken, deleteImages);

export default router;
