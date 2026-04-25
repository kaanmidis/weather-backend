import { Router } from "express";
import { getWeather, getWeatherForecast } from "../controllers/weatherController";

const router = Router();

router.get("/:city", getWeather);
router.get("/forecast/:city", getWeatherForecast);

export default router;