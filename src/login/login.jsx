import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

export function LoginPage() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/userInfo'); // Navigates to the UserInfo component route
  };

  return (
    <main>
      {/* <h1>Sign in to Apply Smart</h1> */}
      <img
        src="ApplySmartT.png"
        style={{ width: '400px', height: 'auto' }}
        className="responsive-image"
        alt="Apply Smart logo"
      />
      <br />

      <form onSubmit={(e) => e.preventDefault()}>
        <div id="username">
          <input type="text" name="username" placeholder="username" />
        </div>

        <div id="password">
          <input type="password" placeholder="password" />
        </div>

        <button type="button" onClick={handleNavigation}>Login</button>
        <button type="button" onClick={handleNavigation}>Sign up!</button>
      </form>
    </main>
  );
}
