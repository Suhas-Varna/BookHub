import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';

const SearchResultsPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {

    const fetchBooks = async () => {

      if (!query) return;

      try {

        const response = await axios.get('/books/search', {
          params: { query }
        });

        if (response.data.length > 0) {
          setBooks(response.data);
          setError('');
        } else {
          setBooks([]);
          setError('No books found');
        }

      } catch (err) {

        console.error('Error fetching books:', err);
        setBooks([]);
        setError('Error while searching books');

      }

    };

    fetchBooks();

  }, [query]);

  return (
    <div>

      <h2>Search Results for "{query}"</h2>

      {error && <p>{error}</p>}

      <div className="books-grid">

        {books.map((book) => (

          <div className="book-card" key={book._id}>

            <img
              src={book.thumbnail}
              alt={book.title}
              className="book-thumbnail"
              onClick={() => navigate(`/book/${book._id}`)}
            />

            <h3>{book.title}</h3>

            <p>{book.authors.join(', ')}</p>

          </div>

        ))}

      </div>

    </div>
  );

};

export default SearchResultsPage;