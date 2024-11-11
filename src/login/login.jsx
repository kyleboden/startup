import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/userInfo'); // Navigates to the UserInfo component route
  };

  return (
    <main>
      <img
        src="ApplySmartT.png"
        style={{ width: '400px', height: 'auto' }}
        className="responsive-image"
        alt="Apply Smart logo"
      />
      <br />

      <div>
        {authState !== AuthState.Unknown && <h1></h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}
