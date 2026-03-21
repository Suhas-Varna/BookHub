import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../axiosConfig';
import './SignupPage.css';

const SignupPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('/signup', {
        email,
        password
      });

      if (response.status === 201) {
        navigate('/login');
      }

    } catch (err) {

      console.error('Error during signup:', err);

      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }

    }
  };

  return (
    <div className="signup-container">

      <div className="signup-card">

        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit">
            Sign Up
          </button>

        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
};

export default SignupPage;