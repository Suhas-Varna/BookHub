const express = require('express');
const router = express.Router();
const { getBooks, searchBooks, getBookDetails, getRecommendedBooks } = require('../controllers/bookController');

// Fetch all books
router.get('/', getBooks);

// Search books
router.get('/search', searchBooks);

// Recommended books
router.get('/recommended/:id', getRecommendedBooks);

// Fetch book details
router.get('/:id', getBookDetails);

module.exports = router;
