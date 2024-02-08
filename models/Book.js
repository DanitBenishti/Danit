const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    topic: String,
    year: Number,
    loaned: Boolean
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;