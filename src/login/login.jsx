import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ setUser }) {
  //purpose: when you log in, you automatically go to the play page from the video (last part)
  const navigate = useNavigate();

  // State to store the input text
  const [text, setText] = React.useState('');

  // Function to handle login
  function loginUser() {
    console.log('loginUser', text); // DEBUG
    setUser(text);
    navigate('/play'); // Navigate to the play page

    //putting user in local storage because we pushed it
    localStorage.setItem('user', text);
    //
  }

  // Function to handle text input change
  function textChange(event) {
    setText(event.target.value); // Update state with the new text
    console.log('textChange', event.target.value); // DEBUG
  }

  //we also want to pass around the user! so we will use pusing state up, so we go to the app.js 
  // and pass it down to the play.js

  return (
    <main>
      <h2 id="loginHeader">Login</h2>

      <img src="shrek.png" className="shrekster" alt="Shrek" />

      <form method="get" action="play.html">
        <div className="login-email-container">
          <span>@</span>
          
          <input type="text" onChange={textChange} />
          {/* ISSUE FIXED: added type="button" to prevent form submission */}
          <button type="button" onClick={loginUser}>getInTheSwamp</button>
        </div>
        <div className="password-container">
          <span>🔒</span>
          <input type="password" placeholder="password" />
          <button type="submit">CreateTheSwamp</button>
        </div>
        
      </form>
    </main>
  );
}
//checking logging in
//<div>{text}</div>