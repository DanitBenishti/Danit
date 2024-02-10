
const express = require('express');
const router = express.Router();

const BookService = require('../services/bookService');
const UserService = require('../services/userService');

router.put('/loan/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    // Check if the user has already loaned 5 books
    const user = await UserService.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.booksLoaned >= 5) {
      return res.status(400).json({ message: 'You have already loaned 5 books' });
    }

    // Loan the book
    const book = await BookService.loanBook(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Increment the number of books loaned by the user
    await UserService.incrementBooksLoaned(user._id);

    res.json({ message: 'Book loaned successfully', book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  router.put('/return/:id', async (req, res) => {
    const bookId = req.params.id;
  
    try {
      const book = await BookService.returnBook(bookId);
      res.json({ message: 'Book returned successfully', book });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to return book', error: error.message });
    }
  });

  module.exports = router;