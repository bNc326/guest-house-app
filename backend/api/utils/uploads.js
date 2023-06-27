import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "store/images/gallery");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

export const uploads = multer({ storage: storage });
