import express from "express";
import { uploads } from "../utils/uploads.js";
import {
  getGallery,
  getOneImage,
  editImage,
  deleteImage,
  uploadImage,
} from "../controllers/gallery.js";
const router = express.Router();

router.get("/", getGallery);
router.post("/upload", uploads.array("images"), uploadImage);
router.get("/:id", getOneImage);
router.put("/:id", editImage);
router.delete("/", deleteImage);

export default router;
