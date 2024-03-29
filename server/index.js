import express from 'express'; // old version : const express = require('express')
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import weatherRoutes from './routes/weather.js';
import clothesRoutes from './routes/clothes.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}));

app.use(cors());
app.use('/posts', postRoutes); // all routes start with posts
app.use('/user', userRoutes);
app.use('/weather', weatherRoutes);
app.use('/clothes', clothesRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
.catch((error) => console.log(error.message));
