import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();
  const admin = localStorage.getItem("admin") === "true";
  let auth = localStorage.getItem("isAuthenticated") === "true";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("admin");
    auth = false;

    navigate(`/login`);
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/">
         
          New App
        </Link>
      </div>
      <ul>
        {!auth ? (
          <>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link to="/">HOME</Link>
              </li>
            </CSSTransition>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link to="/about">ABOUT</Link>
              </li>
            </CSSTransition>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link id="login" to="/login">
                  LOGIN
                </Link>
              </li>
            </CSSTransition>
          </>
        ) : (
          <>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link to="/">HOME</Link>
              </li>
            </CSSTransition>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link to="/about">ABOUT</Link>
              </li>
            </CSSTransition>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link onClick={handleLogout} to="/">
                  LOGOUT
                </Link>
              </li>
            </CSSTransition>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;