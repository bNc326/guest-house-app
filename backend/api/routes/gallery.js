import express from "express";
import { uploads } from "../utils/uploads.js";
import {
  getGallery,
  getOneImage,
  editImage,
  deleteImage,
  uploadImage,
} from "../controllers/gallery.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/", getGallery);
router.post("/upload", verifyToken, uploads.array("images"), uploadImage);
router.get("/:id", getOneImage);
router.put("/:id", verifyToken, editImage);
router.delete("/", verifyToken, deleteImage);

export default router;
