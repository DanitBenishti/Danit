const Book = require('../models/Book');

const BookService = {
  async loanBook(bookId) {
    try {
      const book = await Book.findById(bookId);
      if (!book) {
        throw new Error('Book not found');
      }

      if (book.availableCopies <= 0) {
        throw new Error('Book is not available for loan');
      }

      book.availableCopies--;
      book.loaned = true;
      await book.save();

      return book;
    } catch (error) {
      throw error;
    }
  },

  async returnBook(bookId) {
    try {
      const book = await Book.findById(bookId);
      if (!book) {
        throw new Error('Book not found');
      }

      book.availableCopies++;
      book.loaned = false;
      await book.save();

      return book;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = BookService;