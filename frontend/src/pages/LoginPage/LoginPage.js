import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && window.location.pathname !== '/login') {
      navigate('/');
    }
  }, [navigate]);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('login', { email, password });

      if (response.data.success) {

        localStorage.setItem('token', response.data.token);
        navigate('/');

      } else {

        setError(response.data.message || 'Invalid email or password');

      }

    } catch (error) {

      console.error('Error logging in:', error);
      setError('Failed to log in. Please check your credentials.');

    }
  };


  return (

    <div className="login-page">

      {/* NAVBAR */}
      <div className="navbar">

        <div className="logo">
          BookHub
        </div>

        <div className="menu">
          <ul>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

      </div>


      {/* MAIN CONTENT */}
      <div className="content-wrapper">

        {/* LEFT SIDE - WELCOME TEXT */}
        <div className="welcome-box">

          <h1>
            Welcome to <span>BookHub</span>
          </h1>

          <p>
            Discover your next favorite book and share your thoughts with our community.
          </p>

        </div>


        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="form">

          <h2>Login</h2>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

            {error && <p className="error-message">{error}</p>}

            <button className="btnn" type="submit">
              Login
            </button>

          </form>

          <p className="link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>

        </div>

      </div>

    </div>

  );
};

export default LoginPage;