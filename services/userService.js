const User = require('../models/User');

const UserService = {
  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async incrementBooksLoaned(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      // Increment the number of books loaned by the user
      user.booksLoaned++;
      await user.save();
    } catch (error) {
      throw error;
    }
  }
};

module.exports = UserService;