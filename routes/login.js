const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const { registerUser, getUserByUsername } = require('../public/userService');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userService.authenticate(username, password);
        req.session.user = user; // Store user information in session
        res.redirect('/books'); // Redirect to dashboard after successful login
    } catch (error) {
        console.error(error);
        res.redirect('/login'); // Redirect back to login page with error message
    }
});

module.exports = router;