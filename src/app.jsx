import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Play } from "./play/play";
import { Friends } from "./friends/friends";
import { About } from "./about/about";
import { AuthState } from './login/authState';
import { Quote } from './play/Quote';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem("user") || null);
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  //testing the api
  fetch('/api/test')
    .then(response => response.json())
    .then(data => console.log(data)); 

  return (
    <BrowserRouter>
      <div className="app bg-light-green text-light">
        <header className=" container-fluid">
          <div className="navbar-brand">
            Shrek<sup>&reg;</sup>
          </div>
          <p>welcome {userName} to your swamp</p>
        </header>
        <article className="container-fluid">
          <nav>
            <menu className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="">
                  Login
                </NavLink>
              </li>
               {authState === AuthState.Authenticated && ( 
                <li className='nav-item'>
                  <NavLink className='nav-link' to='play'>
                    Play
                  </NavLink>
                </li>
               )} 
               {authState === AuthState.Authenticated && ( 
                <li className='nav-item'>
                  <NavLink className='nav-link' to='friends'>
                    Friends
                  </NavLink>
                </li>
               )}
              <li className="nav-item">
                <NavLink className="nav-link" to="about">
                  About
                </NavLink>
              </li>
            </menu>
          </nav>
        </article>
        <Routes>
          <Route path="/" element={<Login
        userName={userName}
        authState={authState}
        //onAuthChange function is defined here (according to the video) because it's the PARENt component
        onAuthChange={(userName, authState) => {
          //this is the function that is passed from the child component (Login) to the parent component (App)
          //purpose: when you log in, you automatically go to the play page from the video (last part)
          setAuthState(authState); //updates if user is logged in or not
          setUserName(userName); //updates the username
        }}
      />
    }
    exact />
          <Route path="/play" element={<Play user={userName} />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/about" element={<About />} />
          <Route path="/quotes" element={<Quote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>
          <hr />
          <span className="text-reset">Joanie's heart and soul</span>
          <br />
          <a href="https://github.com/joansia9/startup.git">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}

/*
<main>
    <h2 id = "loginHeader"> </h2>
      <img src = "shrek.png" class= "shrekster" ></img>
      <form method="get" action="play.html">
        

      <div class="login-email-container">
          <span>@</span>
          <input type="text" placeholder="your@email.com" />
          <button type="submit">getInTheSwamp</button>
        </div>
        <div class="password-container">
          <span>🔒</span>
          <input type="password" placeholder="password" />
          <button type="submit">CreateTheSwamp</button>
        </div>


      </form>
  </main>
*/


//for login 
//Login setUser={setUser} 