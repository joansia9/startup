import React from 'react';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';
import './unauthenticated.css';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className='input-group mb-3'>
          <span className='input-group-text'>@</span>
          <input 
            className='form-control' 
            type='text' 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
            placeholder='your@email.com' 
          />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>🔒</span>
          <input 
            className='form-control' 
            type='password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='password' 
          />
        </div>
        <div className="button-group">
          <Button 
            variant='primary' 
            onClick={() => loginUser()} 
            disabled={!userName || !password}
            className="me-2"
          >
            Login
          </Button>
          <Button 
            variant='secondary' 
            onClick={() => createUser()} 
            disabled={!userName || !password}
          >
            Create
          </Button>
        </div>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </div>
  );
}
