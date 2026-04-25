import { Request, Response } from "express";
import { getCurrentWeather, getForecast } from "../services/weatherService";

interface CityParams {
    city: string;
}

export const getWeather = async (req: Request<CityParams>, res: Response) => {
    try {

        const { city } = req.params;
        const data = await getCurrentWeather(city);
        res.json({
            status: "success",
            data
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Unable to fetch weather data"
        });
    }
}

export const getWeatherForecast  = async (req: Request<CityParams>, res: Response) => {
    try {

        const { city } = req.params;
        const data = await getForecast(city);
        res.json({
            status: "success",
            data
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Unable to fetch weather data"
        });
    }
}