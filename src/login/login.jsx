import React from 'react';

export function Login() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <h2 id = "loginHeader"> </h2>

      <img src = "shrek.png" className= "shrekster" ></img>

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
  );
}