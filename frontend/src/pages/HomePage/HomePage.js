import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import './HomePage.css';

const generateStars = (rating = 0) => {

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="stars">
      {'★'.repeat(fullStars)}
      {halfStar && '☆'}
      {'☆'.repeat(emptyStars)}
    </div>
  );

};

const HomePage = () => {

  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {

    const fetchBooks = async () => {

      try {

        const response = await axios.get('/books');
        setBooks(response.data);

      } catch (error) {

        console.error('Error fetching books:', error);

      }

    };

    fetchBooks();

  }, []);

  const handleSearch = () => {

    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);

  };

  const handleLogout = () => {

    localStorage.removeItem('token');
    navigate('/login');

  };

  return (
    <div className="home-container">

      <div className="hero-section">

        <h1>Welcome to BookHub</h1>
        <p>Your next great read is just a click away!</p>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>

        <div className="search-bar">

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books by title, author, or category"
            className="search-input"
          />

          <button onClick={handleSearch} className="search-btn">
            Search
          </button>

        </div>

      </div>

      <div className="books-grid">

        {books.map((book) => (

          <div className="book-card" key={book._id}>

            <img
              src={book.thumbnail}
              alt={book.title}
              className="book-thumbnail"
              onClick={() => navigate(`/book/${book._id}`)}
            />

            <h3 className="book-title">{book.title}</h3>

            <p className="book-authors">
              {book.authors ? book.authors.join(', ') : 'Unknown Author'}
            </p>

            <div className="book-rating">
              {generateStars(book.average_rating)}
            </div>

          </div>

        ))}

      </div>

    </div>
  );

};

export default HomePage;