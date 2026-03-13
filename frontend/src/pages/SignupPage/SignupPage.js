import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

      // If backend returns success (201)
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

      <h2>Sign Up</h2>

      <form onSubmit={handleSignup}>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Sign Up</button>

      </form>

    </div>
  );
};

export default SignupPage;