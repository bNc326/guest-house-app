import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: password,
    });

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  res.clearCookie("access_token", { httpOnly: true }).status(200).json({
    success: true,
    status: 200,
    message: "A felhasználó sikeresen kijelentkezett!",
  });
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });
    if (user === null) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "A felhasználó nem található!",
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Helytelen felhasználónév vagy jelszó! ",
      });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password, createdAt, updatedAt, __v, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        ...otherDetails,
      });
  } catch (err) {
    next(err);
  }
};
