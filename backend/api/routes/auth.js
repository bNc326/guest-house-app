import express from "express";
import { login, logout, register, refresh } from "../controllers/auth.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();
router.delete("/logout", logout);
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", verifyToken, refresh);

export default router;
