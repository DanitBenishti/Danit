const bcrypt = require('bcrypt');
const User = require('../models/User');

async function authenticate(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid username or password');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid username or password');
    }
    return user;
}

async function register(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
}

async function getUserByUsername(username) {
    try {
        const user = await User.findOne({ username: username });
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUserById(userId) {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    authenticate,
    register,
    getUserByUsername,
    getUserById
};