import React, { useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { HomePage } from './homePage/homePage';
import { Login } from './login/login';
import { Generator } from './generator/generator';
import { UserInfo } from './userInfo/userInfo';
import { AuthState } from './login/authState';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {

  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  const [isOpen, setIsOpen] = useState(false); // State to manage the toggle

  const toggleNavbar = () => {
    setIsOpen(!isOpen); // Toggle the state
  };

  return (
    <BrowserRouter>
      <div>
        <header className="d-flex justify-content-between align-items-center fixed-top">
          <a href="/">
            <img src="ApplySmartTWhite.png" style={{ width: '140px', height: 'auto' }} alt="Logo" />
          </a>
          <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleNavbar}
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                {authState === AuthState.Authenticated && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/userInfo">Update Information</NavLink>
                  </li>
                )}
                {authState === AuthState.Authenticated && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/generator">Resume Generator</NavLink>
                  </li>
                )}

              </ul>
            </div>
          </nav>
        </header>

        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
            path='/login'
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/userInfo" element={<UserInfo />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>
          <div className="container-fluid">
            <span className="text-reset">Kyle Boden</span>
            <a href="https://github.com/kyleboden/startup/tree/react-version">
              <br />
              Click here to see my GitHub
            </a>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}

