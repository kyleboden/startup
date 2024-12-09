import React from 'react';

import { UserNotifier, UserEvent } from './../login/webSocket.js';
import './users.css';

export function Users() {
//   const userName = props.userName;

  const [events, setEvent] = React.useState([]);

  React.useEffect(() => {
    UserNotifier.addHandler(handleUserEvent);

    return () => {
        UserNotifier.removeHandler(handleUserEvent);
    };
  });

  function handleUserEvent(event) {
    setEvent([...events, event]);
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      let message = 'unknown';
      if (event.type === UserEvent.Login) {
        message = `Logged in`;
      } else if (event.type === UserEvent.Logout) {
        message = `Logged out`;
      } else if (event.type === UserEvent.System) {
        message = event.value.msg;
      }

      messageArray.push(
        <div key={i} className='event'>
          <span className={'player-event'}>{event.from.split('@')[0]}</span>
          {message}
        </div>
      );
    }
    return messageArray;
  }

  return (
    <div className='players'>
      {/* <span className='player-name'>{userName}</span> */}
      <div id='player-messages'>{createMessageArray()}</div>
    </div>
  );
}
