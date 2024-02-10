const express = require('express');
const router = express.Router();
const passport = require('passport');
const Book = require('../models/Book');
const Author = require('../models/author');

router.use(express.json());

const isAuthenticated = (req, res, next) => {
    passport.authenticate('basic', { session: false })(req, res, next);
  };

//adding a new book
router.post('/', isAuthenticated, async (req, res, next) => {
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
router.get('/', isAuthenticated, async (req, res, next) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        next(error); 
    }
});
//retrieve a specific book
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send(book);
    } catch (error) {
        next(error); 
    }
});
//search books by author, topic, or year
router.get('/search', isAuthenticated, async (req, res) => {
    try {
        const { author, topic, year } = req.query;
        const query = {};
        if (author) query.author = author;
        if (topic) query.topic = topic;
        if (year) query.year = year;
        const books = await Book.find(query);
        res.send(books);
    } catch (error) {
        next(error); 
    }
});
//update a specific book by its ID
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const { title, author, topic, year } = req.body;
        const book = await Book.findByIdAndUpdate(req.params.id, { title, author, topic, year }, { new: true });
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send(book);
    } catch (error) {
        next(error); 
    }
});
//delete a specific book by its ID
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send('Book deleted successfully');
    } catch (error) {
        next(error); 
    }
});

module.exports = router;