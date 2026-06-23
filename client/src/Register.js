import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';  // import Link
import './Auth.css';


function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);  // track error or success

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    try {
      await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });
      setMessage('Registration successful! Redirecting to login...');
      setIsError(false);
      // Redirect after short delay so user can see success message
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setMessage('Registration failed. Username may already exist.');
      setIsError(true);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Register</button>
      </form>

      {message && (
        <p style={{ color: isError ? 'red' : 'green' }}>
          {message}
        </p>
      )}

      <h6>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
          Login here
        </Link>
      </h6>
    </div>
  );
}

export default Register;
