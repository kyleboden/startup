import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();
  
  // Get the userName from localStorage (or props if you pass it down)
  const userName = localStorage.getItem('userName');

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <div>
      <div className='playerName'>
        {/* Conditionally render the welcome message */}
        {userName && <h2>Welcome, {userName}!</h2>}
      </div>
      <Button variant='primary' onClick={() => navigate('/userInfo')}>
        Continue
      </Button>
      <Button variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
