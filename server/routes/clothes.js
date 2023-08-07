import express from 'express';
import { get } from 'mongoose';
import { getWeatherClothes, getFilteredClothes } from '../controllers/clothes.js';
const router = express.Router();

router.get('/filter', getWeatherClothes);

export default router;