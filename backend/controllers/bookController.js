const Book = require('../models/Book');


// Fetch all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.json(books);

    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch books',
            error: error.message
        });
    }
};


// Fetch details of a book by its ID
const getBookDetails = async (req, res) => {

    const { id } = req.params;

    try {

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.json(book);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to fetch book details',
            error: error.message
        });

    }
};


// Search books
const searchBooks = async (req, res) => {

    const { query } = req.query;

    if (!query || query.trim() === '') {
        return res.status(400).json({
            message: 'Search query cannot be empty.'
        });
    }

    try {

        console.log('Search query received:', query);

        const books = await Book.find({
            $or: [

                // title is a string
                { title: { $regex: query, $options: 'i' } },

                // authors is an array
                { authors: { $elemMatch: { $regex: query, $options: 'i' } } },

                { isbn13: { $regex: query, $options: 'i' } }

            ]
        });

        console.log('Books found:', books.length);

        // Always return array
        res.json(books);

    } catch (error) {

        console.error('SearchBooks Error:', error);

        res.status(500).json({
            message: 'Failed to search books',
            error: error.message
        });

    }

};


// Fetch recommended books based on category
const getRecommendedBooks = async (req, res) => {

    const { id } = req.params;

    try {

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        const recommendedBooks = await Book.find({

            categories: { $in: book.categories },
            _id: { $ne: book._id }

        }).limit(5);

        res.json(recommendedBooks);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to fetch recommended books',
            error: error.message
        });

    }

};


module.exports = {
    getBooks,
    getBookDetails,
    searchBooks,
    getRecommendedBooks
};