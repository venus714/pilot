import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/navbar/Navbar';
import Home from './Home';
import LoginForm from './components/Login/Login';
import SignupForm from './components/signup/Signup';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [admin, setAdmin] = useState(false);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post('http://127.0.0.1:3000/login', {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        if (res.status === 202) {
          localStorage.setItem('token', res.data.jwt);
          localStorage.setItem('user_id', res.data.user.id);
          localStorage.setItem('admin', res.data.user.admin);

          setUserId(res.data.user.id);
          setAdmin(res.data.user.admin);
          setIsAuthenticated(true);

          if (res.data.user.admin) {
            window.location.href = '/orderlist';
          } else {
            window.location.href = '/orders';
          }
        } else {
          alert('Failed to Login');
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setError(error.response.data.error);
        } else {
          setError('An error occurred. Please try again later.');
        }
      });
  };

  return (
    <Router>
      <div className="App">
        <Navbar setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} admin={admin} />
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} admin={admin} />} />
          {/* <Route path="/faq" element={<FaqPage />} /> */}
          <Route path="/login" element={<LoginForm error={error} setValues={setValues} values={values} handleLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupForm />} />
          {/* {isAuthenticated && (
            <>
              <Route path="/orders" element={<OrderForm userId={userId} admin={admin} />} />
              <Route path="/orderlist" element={<OrderList userId={userId} admin={admin} />} />
              <Route path="/updateorder/:id" element={<OrderForm userId={userId} admin={admin} />} />
              <Route path="/ordercard/:id" element={<OrderCard userId={userId} admin={admin} />} />
            </>
          )} */}
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;