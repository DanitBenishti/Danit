const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    topic: { type: String, required: true },
    year: { type: Number, required: true },
    totalCopies: { type: Number, required: true },
    availableCopies: { type: Number, required: true },
    loaned: { type: Boolean, default: false }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;