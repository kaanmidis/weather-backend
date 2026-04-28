import { Router } from "express";
import { getWeather, getWeatherForecast } from "../controllers/weatherController";

const router = Router();

router.get("/forecast/:city", getWeatherForecast);
router.get("/:city", getWeather);

export default router;
