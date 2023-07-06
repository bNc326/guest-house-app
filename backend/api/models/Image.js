import mongoose from "mongoose";

export const ImageSchema = new mongoose.Schema(
  {
    alt: String,
    image: {
      data: Buffer,
      contentType: String,
    },
    trimmedPath: String,
  },
  { timestamps: true }
);

export const ImageModel = mongoose.model("gallery", ImageSchema);
