import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import  { Book } from './model/bookModel.js'

const app = express();

app.use(express.json());

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

app.get('/', (req,res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN Stack bookstore')
});

//route for saving a new book
app.post('/books', async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author and publishYear'
            });
        };
        const book= new Book({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        });
        //creating book
        await book.save();
        return res.status(201).send(book);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
});