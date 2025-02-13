import React from 'react';
import './play.css';

export function Play() {
  return (
    <main>
      <div class="quotes">
      </div>
      <h1> WEBSOCKET PLACEHOLDER: api to generate quote/ realtime likes</h1>

      <div class="container">
        <h1>Random Quote Generator</h1>
        <p id="quote">instructions: Click the button to get a quote!</p>
        <button onclick="generateQuote()">Get Quote</button>
      </div>
      <div class="box">
        I am a QUOTE box!
      </div>

      <h1>another placeholder for database to store liked/saved quotes</h1>
      <ul class="saved">
        <li class="listed-quotes">quote1 saved</li>
        <li class="listed-quotes">quote2 saved</li>
        <li class="listed-quotes">quote3 saved</li>
      </ul>
    </main>
  );
}