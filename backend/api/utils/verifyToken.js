import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.replace("Bearer ", "");

  if (!token) {
    return next(createError(401, "Nem vagy hitelesítve!"));
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return next(createError(403, "A token nem érvényes!"));
    req.user = user;
    next();
  });
};
