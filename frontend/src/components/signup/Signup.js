import React, { useState } from 'react';
import axios from 'axios';
import '../signup/Sighnup.css';//
import login from '../Login/Login';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:3000/register', {
        username,
        email,
        password,
      });
      localStorage.setItem('token', response.data.jwt); // Storing the token
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.error || 'Validation error');
      } else {
        setErrors('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div id="signup-box" className="signup-box">
      <form onSubmit={handleSubmit}>
        <h2 id="signupTitle">Sign Up</h2>
        {errors && (
          <div>
            <strong className="font-bold">Error:</strong>
            <ul className="list-disc ml-4">
              <li id="error_color">{errors}</li>
            </ul>
          </div>
        )}
        <div id="user-box" className="user-box">
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <label>Username</label>
        </div>
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

        <a href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <p onClick={handleSubmit} id="signupBtn">Sign Up</p>
        </a>
        <p>Already have an account?</p>
        <a href="/login">Login here</a>
      </form>
    </div>
  );
}

export default SignupForm;