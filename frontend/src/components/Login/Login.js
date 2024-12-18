import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
// Import your CSS file here if it's separated into a CSS file
// import './Login.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:3000/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.jwt); // Storing the token
      window.location.href = '/'; // Redirect to dashboard or homepage
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrors('Invalid email or password');
      } else {
        setErrors('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div id="login-box" className="login-box">
      <form onSubmit={handleSubmit}>
        <h2 id="loginTitle">Login</h2>
        {errors && (
          <div id="error">
            <strong id="errorTitle">Error:</strong>
            <ul>
              <li>{errors}</li>
            </ul>
          </div>
        )}
        <div id="user-box" className="user-box">
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label>Email</label>
        </div>
        <div id="user-box" className="user-box">
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <label>Password</label>
        </div>

        <a href="#" onClick={handleSubmit}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <p id="loginBtn">Login</p>
        </a>
        <p>Don't have an account?</p>
        <a href="/signup">Sign up here</a>
      </form>
    </div>
  );
}

export default LoginForm;