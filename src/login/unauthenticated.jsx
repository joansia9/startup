import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  //WE ADD THE FUNCTIONS HERE because this is the place where the login and create users are changed!

  //this is the flow
//   App.jsx (Parent)
//   ↓ passes onAuthChange
// Login.jsx (Child)
//   ↓ passes onLogin
// Unauthenticated.jsx (Grandchild)
//   ↓ calls onLogin when login is successful

  async function loginUser() {
    try {
      //endpoint is the route to the server
      //grabbing the json data from the SERVER
      const response = await fetch(`http://localhost:4000/api/auth/login`, {
        method: 'post',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ email: userName, password: password }),
        credentials: 'include'
      });
      //waiting for the response from the server
      const data = await response.json();
      
      //if the response is ok, then we set the userName in the local storage and call the onLogin function
      if (response.ok) {
        localStorage.setItem('userName', userName); //setting the userName in the local storage
        props.onLogin(userName); //this is the function that is passed from the parent component
      } else {
        setDisplayError(`⚠ Error: ${data.error}`);
      }
    } catch (error) {
      setDisplayError('Failed to connect to server');
    }
  }

  async function createUser() {
    try {
      //endpoint is the route to the server
      //grabbing the json data from the SERVER
      const response = await fetch(`http://localhost:4000/api/auth/create`, {
        method: 'post',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ email: userName, password: password }),
        credentials: 'include'
      });
      
      //waiting for the response from the server
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('userName', userName); //setting the userName in the local storage
        props.onLogin(userName); //this is the function that is passed from the parent component
      } else {
        setDisplayError(`⚠ Error: ${data.error}`);
      }
    } catch (error) {
      setDisplayError('Failed to connect to server');
    }
  }

  return (
    <>
      <div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>@</span>
          <input className='form-control' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='your@email.com' />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>🔒</span>
          <input className='form-control' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        </div>
        <Button variant='primary' onClick={loginUser} disabled={!userName || !password}>
          Login
        </Button>
        <Button variant='secondary' onClick={createUser} disabled={!userName || !password}>
          Create
        </Button>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
