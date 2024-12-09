import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { UserNotifier, UserEvent } from './webSocket'; // Import the notifier and events

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        UserNotifier.broadcastEvent(props.userName, UserEvent.Logout, { msg: `${props.userName} has logged out` }); // Notify Logout
        props.onLogout(props.userName);
        const pleaseWork  = 'someone'
        // UserNotifier.broadcastEvent(pleaseWork, UserEvent.Logout, { msg: ` has logged out` }); // Notify logout
        // props.onLogout();
      });
  }

  // return (
  //   <div>
  //     <div className='playerName'>
  //       {/* Conditionally render the welcome message */}
  //       {userName && <h2>Welcome, {userName}!</h2>}
  //     </div>
  //     <Button variant='primary' onClick={() => navigate('/userInfo')}>
  //       Continue
  //     </Button>
  //     <Button variant='secondary' onClick={() => logout()}>
  //       Logout
  //     </Button>
  //   </div>
  // );

  return (
    <div>
      <div className='welcomeMessage'>Welcome, {props.userName}!</div>
      {/* <div className='playerName'>{props.userName}</div> */}
      <Button variant='primary' onClick={() => navigate('/userInfo')}>
        Continue
      </Button>
      <Button variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
  
  
}