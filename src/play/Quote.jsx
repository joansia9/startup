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

  function addQuotes() {
    console.log('addQuote');
    const quote = localStorage.getItem('quote');
    const username = localStorage.getItem('userName');
  
    let storedQuotes = localStorage.getItem('quotes');
  
    if (storedQuotes === null) {
      // If no quotes exist, initialize as an empty array
      storedQuotes = [];
    } else {
      // Parse storedQuotes, if it's not an array, reset it
      try {
        storedQuotes = JSON.parse(storedQuotes);
        //hard coding now because it was not an array and idk
        if (!Array.isArray(storedQuotes)) {
          console.error('stored quotes not array omg what is happenign rn');
          storedQuotes = []; //made an array
          //SOLUTION: cleared local storage but
          console.error('making an array error')
        }
      } catch (error) {
        console.error('Error parsing storedQuotes:', error);
        storedQuotes = [];
      }
    }
  
    // Add quote to the array if quote and username exist
    if (quote && username) {
      //fix: storing quote and associated username to fix friends lol
      storedQuotes.push({ quote: quote, username: username });
      localStorage.setItem('quotes', JSON.stringify(storedQuotes));
  
      console.log(`Quote: "${quote}" added by ${username}`); // DEBUGGGGG
    } else {
      console.log("Quote or username not found in localStorage. pls check or clear it");
    }
  }
  

  return (
    <div className="container">
      <h1>Random Quote Generator</h1>
      <p>Instructions: Click the button to get a quote!</p>
      <button onClick={generateQuote}>Get Quote</button>
      <button onClick={addQuotes}>Like this quote!</button> 
      <div className="box">
        <p>{quote}</p>
      </div>
    </div>
  );
}