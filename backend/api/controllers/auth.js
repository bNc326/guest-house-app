import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

let refreshTokens = [];

const generateAccessToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

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

    const accessToken = generateAccessToken({ id: user._id });

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET
    );
    refreshTokens.push(refreshToken);

    const { password, createdAt, updatedAt, __v, ...otherDetails } = user._doc;
    res.status(200).json({
      ...otherDetails,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const refresh = (req, res, next) => {
  const token = req.body.token;
  if (!token) return next(createError(401, "Nincs refresh token!"));
  if (!refreshTokens.includes(token)) {
    return next(createError(403, "Nem található ilyen refresh token!"));
  }

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return createError(403, "Nem érvényes a refresh token!");
    const accessToken = generateAccessToken({ id: user._id });
    res.status(200).json({ success: true, status: 200, accessToken });
  });
};

export const logout = (req, res, next) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);

  res
    .status(204)
    .json({ success: true, status: 204, message: "Sikeresen kijelentkeztél!" });
};
