import express from 'express'; // old version : const express = require('express')
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}));

app.use(cors());
app.use('/posts', postRoutes); // all routes start with posts

const CONNECTION_URL = 'mongodb+srv://berruk:berruk123456@cluster0.woeopq8.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
.catch((error) => console.log(error.message));


