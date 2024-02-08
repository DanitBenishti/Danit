// Middleware for handling 404 Not Found errors
const notFoundHandler = (req, res, next) => {
    res.status(404).send('Resource not found');
};

// Middleware for handling general errors
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
};

module.exports = {
    notFoundHandler,
    errorHandler
};