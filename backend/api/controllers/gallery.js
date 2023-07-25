import fs from "fs";
import { v4 as uuid } from "uuid";
import pkg from "lodash";

const { pullAt } = pkg;
const dirPath = "./store/images/gallery";
const filePath = "./store/gallery/gallery.json";
const removePath = "./store/images/gallery/";

export const getImages = (req, res, next) => {
  try {
    fs.readFile(filePath, (err, file) => {
      const data = JSON.parse(file);
      res.status(200).send(data);
    });
  } catch (err) {
    console.log("hiba", err);
    next(err);
  }
};

export const getImage = (req, res, next) => {
  try {
    fs.readFile(filePath, (err, file) => {
      const data = JSON.parse(file);

      const foundImg = data.find((img) => img.id === req.params.id);

      if (!foundImg) {
        res.send({
          success: false,
          status: 404,
          message: "A kép nem található!",
          id: req.params.id,
        });
        return;
      }
      res.send(foundImg);
    });
  } catch (err) {}
};

export const uploadImage = (req, res, next) => {
  try {
    fs.readFile(filePath, (err, file) => {
      const data = JSON.parse(file);
      const files = req.files;

      files.map((file) => {
        const foundItem = data.find((img) => img.path === file.originalname);

        if (!foundItem) {
          const split = file.originalname.split(".");
          const updateBody = {
            id: uuid(),
            alt: file.originalname.replace(/\.[^/.]+$/, ""),
            path: file.originalname,
            trimmedPath: `${split[0].substring(0, 12)}... .${split[1]}`,
          };
          data.push(updateBody);
        }
      });

      fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
        }
        res.status(200).json({
          success: true,
          status: 200,
          message: `A képet/ket sikeresen feltőltötted!`,
        });
      });
    });
  } catch (err) {
    console.log("feltöltés hiba", err);
    next(err);
  }
};

export const editImage = (req, res, next) => {
  try {
    fs.readFile(filePath, (err, file) => {
      const data = JSON.parse(file);

      const editHandler = (item) => {
        if (item.id === req.params.id) {
          item.alt = req.body.alt;
          return item;
        }
      };

      const foundImg = data.filter(editHandler);

      if (foundImg.length === 0) {
        res.send({
          success: false,
          status: 404,
          message: "A kép nem található!",
          id: req.params.id,
        });
        return;
      }

      fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
        }

        res.status(201).send({
          success: true,
          status: 201,
          message: `Sikeresen szerkesztetted a ${req.params.id} azonosítójú képet!`,
        });
      });
    });
  } catch (err) {
    next(err);
  }
};

export const deleteImages = (req, res, next) => {
  try {
    const deleteItems = req.body;
    fs.readFile(filePath, (err, file) => {
      if (err) {
        console.log("error");
        return;
      }

      const data = JSON.parse(file);
      const indexes = [];
      const imgName = [];
      data.map((img, index) => {
        deleteItems.map((item) => {
          if (img.id === item) {
            indexes.push(index);
            imgName.push(img.path);
          }
        });
      });

      imgName.map((img) => {
        fs.readdir(dirPath, (err, file) => {
          const files = file;
          files.map((file) => {
            if (file === img) {
              fs.unlinkSync(removePath + img);
            }
          });
        });
      });

      if (indexes.length === 0) {
        res.send({
          success: false,
          status: 404,
          message: "A kép/ek nem található/ak!",
          id: req.body,
        });
        return;
      }

      const removedImg = pullAt(data, indexes);

      fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
        }
        res.status(201).send({
          success: true,
          status: 201,
          message: `Sikeresen törölted a képet/ket!`,
          id: removedImg,
        });
      });
    });
  } catch (err) {
    next(err);
  }
};
