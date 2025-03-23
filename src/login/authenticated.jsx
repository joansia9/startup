import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await fetch('http://localhost:4000/api/auth/logout', {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok) {
        localStorage.removeItem('userName');
        props.onLogout();
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <div className="authenticated-container">
      <div className="button-group">
        <Button variant='success' onClick={() => navigate('/play')}>
          Play
        </Button>
        <Button variant='outline-success' onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
