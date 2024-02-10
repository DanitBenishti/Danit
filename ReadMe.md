Book Library Management System Documentation

Introduction:
The Book Library Management System is a web application developed to manage a library's catalog of books. It provides functionalities for library members to borrow and return books, search for books by various criteria, and manage the catalog through CRUD operations.

Features:
CRUD Operations: Allows administrators to Create, Read, Update, and Delete books from the catalog.
Search Functionality: Enables users to search for books by author, topic, or year.
Loan Management: Provides functionalities for library members to loan and return books, with a limit of 5 books per member.
Basic Authentication: Allows users to authenticate before accessing certain functionalities, such as creating, updating, or deleting books.
Error Handling: Implements error handling for common scenarios, ensuring robustness and reliability.
Database Modeling: Utilizes Mongoose ODM for database modeling and manages relationships between entities like books and authors.
Unit Testing: Includes unit tests for critical components of the application using Mocha and Chai testing framework.

Technologies Used:
Node.js: Backend runtime environment.
Express.js: Web application framework for Node.js.
MongoDB: NoSQL database used for storing book and user data.
Mongoose: ODM library for MongoDB.
Passport.js: Authentication middleware for Node.js.
Mocha and Chai: Testing frameworks for Node.js.
Supertest: Library for testing HTTP assertions.

Usage:
1. Creating a Book: Use the /books endpoint with a POST request to add a new book to the catalog.
2. Retrieving Books: Use the /books endpoint with a GET request to retrieve all books in the catalog or use /books/:id to retrieve a specific  book by ID.
3. Searching for Books: Use the /books/search endpoint with query parameters for author, topic, or year to search for books.
4. Loan and Return: Use the /books/loan/:id and /books/return/:id endpoints with a PUT request to loan and return books, respectively.
5. Updating and Deleting Books: Use the /books/:id endpoint with PUT and DELETE requests to update and delete books, respectively.