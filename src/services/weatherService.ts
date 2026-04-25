import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "https://api.openweathermap.org/data/2.5"
const API_KEY = "d7e6001f6693c40a23ae63e558262520";
// current weather

export const getCurrentWeather = async (city: string) => {
    const response = await axios.get(`${BASE_URL}/weather`,{
        params: {
            q:city,
            appid: API_KEY,
            units: "metric",
            lang: "tr"
        }
    });
    return response.data;

};

// 5 days forecast
export const getForecast = async (city: string) => {
        const response = await axios.get(`${BASE_URL}/forecast`,{
        params: {
            q:city,
            appid: API_KEY,
            units: "metric",
            lang: "tr"
        }
    });
    return response.data;
}
