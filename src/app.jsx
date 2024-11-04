import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  const [isOpen, setIsOpen] = useState(false); // State to manage the toggle

  const toggleNavbar = () => {
    setIsOpen(!isOpen); // Toggle the state
  };

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center fixed-top">
        <a href="./index.html">
          <img src="ApplySmartTWhite.png" style={{ width: '200px', height: 'auto' }} alt="Logo" />
        </a>
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom"> {/* Custom background */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar} // Call the toggle function on click
            aria-expanded={isOpen} // Manage aria-expanded for accessibility
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}> {/* Toggle 'show' class */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="index.html">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="login.html">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="generator.html">Resume Generator</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="userInfo.html">Update Information</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main>App components go here</main>


      <footer className="bg-dark text-white-50 mt-auto"> {/* Use mt-auto to push it to the bottom */}
        <div className='container-fluid'>
          <span className='text-reset'>Kyle Boden</span>
          <a className='text-reset' href='https://github.com/kyleboden/startup/tree/main/startup-html'>
            <br />
            Click here to see my GitHub
          </a>
        </div>
      </footer>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
}
