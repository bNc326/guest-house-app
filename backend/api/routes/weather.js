import express from "express";
import { weatherFetcher } from "../controllers/weather.js";
const router = express.Router();

router.get("/", weatherFetcher);

export default router;
