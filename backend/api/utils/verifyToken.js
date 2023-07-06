import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, "Nem vagy hitelesítve!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "A token nem érvényes!"));
    req.user = user;
    res.json({ success: true, status: 200, message: "Sikeres hitelesítés!" });
    next();
  });
};
