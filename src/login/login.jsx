import React from 'react';

import './login.css'; 

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  // return (
  //   <main>
  //     <img
  //       src="ApplySmartT.png"
  //       style={{ width: '400px', height: 'auto' }}
  //       className="responsive-image"
  //       alt="Apply Smart logo"
  //     />
  //     <br />

  //     <div>
  //       {authState !== AuthState.Unknown && <h1></h1>}
  //       {authState === AuthState.Authenticated && (
  //         <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
  //       )}
  //       {authState === AuthState.Unauthenticated && (
  //         <Unauthenticated
  //           userName={userName}
  //           onLogin={(loginUserName) => {
  //             onAuthChange(loginUserName, AuthState.Authenticated);
  //           }}
  //         />
  //       )}
  //     </div>
  //   </main>
  // );
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div>
        {authState !== AuthState.Unknown && <h1>Welcome to Simon</h1>}
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
