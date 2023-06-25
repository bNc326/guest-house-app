import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "store/images/gallery");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});


export const uploads = multer({ storage: storage });
