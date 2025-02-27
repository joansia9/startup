import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Friends } from './friends/friends';
import { About } from './about/about';

export default function App() {
  const [user, setUser] = React.useState(localStorage.getItem('user') || null );
  return (
  <BrowserRouter>
  <div className="app bg-light-green text-light">
  <header className="container-fluid">
  <div className="navbar-brand">
      Shrek<sup>&reg;</sup>
    </div>
        <p>welcome {user} to your swamp</p>

    </header>
    <article className="container-fluid">
    <nav>
    <menu className="navbar-nav">
      
    <li className="nav-item">
      <NavLink className="nav-link" to="">
        Login
      </NavLink>
    </li>
    <li className="nav-item">
      {user && <NavLink className="nav-link" to="play">
        Play
      </NavLink> }
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="friends">
        Friends
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="about">
        About
      </NavLink>
    </li>
  </menu>
    </nav>
  
      </article>
  <Routes>
    <Route path='/' element={<Login setUser = {setUser}/>} exact />
    <Route path='/play' element={<Play user = {user} />} />
    <Route path='/friends' element={<Friends />} />
    <Route path='/about' element={<About />} />
    <Route path='*' element={<NotFound />} />
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
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
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