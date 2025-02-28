// src/components/Quote.jsx
import React, { useState } from 'react';

export function Quote() {
  const quotes = [
    "The joy we feel has little to do with the circumstances of our lives and everything to do with the focus of our lives. — Russell M. Nelson",
    "When the focus of our lives is on Jesus Christ and His gospel, we can feel joy regardless of what is happening—or not happening—in our lives. — Russell M. Nelson",
    "The Lord loves effort, because effort brings rewards that can’t come without it. — Russell M. Nelson",
    "The Savior is the perfect example of how to live. He is the light that dispels darkness. — Russell M. Nelson",
    "Faith in Jesus Christ is the greatest power available to us in this life. — Russell M. Nelson",
    "Ogres are like onions. We have layers. — Shrek",
    "What are you doing in my swamp?! — Shrek",
    "Better out than in, I always say. — Shrek",
    "It’s not exactly rocket science, is it? — Shrek",
    "You know, sometimes things are more than they appear. — Shrek",
  ];

  // Initialize state with the quote from localStorage (if it exists)
  const [quote, setQuote] = useState(localStorage.getItem('quote') || "Click the button to get a quote!");

  // Function to generate a random quote
  function generateQuote() {
    console.log('generateQuote'); // DEBUGGER

    const randomNumber = Math.random();
    const randNum = randomNumber * quotes.length;
    const randomIndex = Math.floor(randNum);
    const randomQuote = quotes[randomIndex];

    setQuote(randomQuote);

    // Persistence
    localStorage.setItem('quote', randomQuote);
  }

  return (
    <div className="container">
      <h1>Random Quote Generator</h1>
      <p>Instructions: Click the button to get a quote!</p>
      <button onClick={generateQuote}>Get Quote</button>
      <div className="box">
        <p>{quote}</p>
      </div>
    </div>
  );
}