import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';

mongoose.connect(mongoDBURL)
.then (() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is running on Port: ${PORT}`);
    });
})
.catch ((err) => {
    console.log(err);
});

const app = express();

app.get('/', (req,res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN Stack bookstore')
});

