import mongoose from "mongoose";
import {OPEN_WEATHER_MAP_API_KEY, OPEN_WEATHER_MAP_API_URL} from "../config.js";

  export const getWeather = async (req, res) => {
    try {
        const url = `${OPEN_WEATHER_MAP_API_URL}?lat=41.01&lon=28.97&appid=${OPEN_WEATHER_MAP_API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) 
        {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();

        const currentWeather = {
            temperature: (data.main.temp - 273),
            description: data.weather[0].description,
            country : data.sys.country,
            location : data.name
          };

        res.status(200).json(currentWeather);

    } catch (error) {
        res.status(404).json( {message : error.message});
    }
}