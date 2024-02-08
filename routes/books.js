const express = require('express');
const router = express.Router();
const passport = require('passport');
const Book = require('../models/Book');

// Middleware for parsing JSON request payloads
router.use(express.json());

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login') // Assuming you have a login route
};

//adding a new book
router.post('/',isAuthenticated , async (req, res, next) => {
    try {
        const { title, author, topic, year } = req.body;
        if (!title || !author || !topic || !year) {
            const error = new Error('Invalid request payload');
            error.status = 400; // Bad Request
            throw error;
        }
        const book = new Book({ title, author, topic, year, loaned: false });
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
});

//retrieve all books
router.get('/',isAuthenticated , async (req, res, next) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
});
//retrieve a specific book
router.get('/:id',isAuthenticated , async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send(book);
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
});
//search books by author, topic, or year
router.get('/search',isAuthenticated , async (req, res) => {
    try {
        const { author, topic, year } = req.query;
        const query = {};
        if (author) query.author = author;
        if (topic) query.topic = topic;
        if (year) query.year = year;
        const books = await Book.find(query);
        res.send(books);
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
});
//update a specific book by its ID
router.put('/:id',isAuthenticated , async (req, res) => {
    try {
        const { title, author, topic, year } = req.body;
        const book = await Book.findByIdAndUpdate(req.params.id, { title, author, topic, year }, { new: true });
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send(book);
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
});
//delete a specific book by its ID
router.delete('/:id',isAuthenticated , async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send('Book deleted successfully');
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
});

// Route for loaning a book
router.put('/loan/:id',isAuthenticated , async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, { loaned: true }, { new: true });
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send('Book loaned successfully');
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
});

//loaning and returning functionality by updating the loaned property of a book document based on its availability status
// Route for returning a book
router.put('/return/:id',isAuthenticated , async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, { loaned: false }, { new: true });
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send('Book returned successfully');
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
});

//If an error occurs during the execution of the try block, we pass the error to the next middleware function by calling next(error).
//The error will then be caught by the error handling middleware defined in your errorHandler.js file and handled appropriately.

module.exports = router;