// src/components/Quote.jsx
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import './Quote.css';

export function Quote() {
  // const quotes = [
  //   "The joy we feel has little to do with the circumstances of our lives and everything to do with the focus of our lives. — Russell M. Nelson",
  //   "When the focus of our lives is on Jesus Christ and His gospel, we can feel joy regardless of what is happening—or not happening—in our lives. — Russell M. Nelson",
  //   "The Lord loves effort, because effort brings rewards that can’t come without it. — Russell M. Nelson",
  //   "The Savior is the perfect example of how to live. He is the light that dispels darkness. — Russell M. Nelson",
  //   "Faith in Jesus Christ is the greatest power available to us in this life. — Russell M. Nelson",
  //   "Ogres are like onions. We have layers. — Shrek",
  //   "What are you doing in my swamp?! — Shrek",
  //   "Better out than in, I always say. — Shrek",
  //   "It’s not exactly rocket science, is it? — Shrek",
  //   "You know, sometimes things are more than they appear. — Shrek",
  // ];
  const [quote, setQuote] = useState("Click the button to get a quote!");
  const [error, setError] = useState(null);

  //  // Initialize state with the quote from localStorage (if it exists)
  //  const [quote, setQuote] = useState(localStorage.getItem('quote') || "Click the button to get a quote!");

  //  // Function to generate a random quote
  //  function generateQuote() {
   console.log('generateQuote'); // DEBUGGER
  const parseXML = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    const quoteText = xmlDoc.querySelector("quoteText")?.textContent || "Unknown";
    const quoteAuthor = xmlDoc.querySelector("quoteAuthor")?.textContent || "Anonymous";
    
    return `${quoteText} — ${quoteAuthor}`;
  };

  // const randomNumber = Math.random();
  //   const randNum = randomNumber * quotes.length;
  //   const randomIndex = Math.floor(randNum);
  //   const randomQuote = quotes[randomIndex];

  //   setQuote(randomQuote);

  //   // Persistence
  //   localStorage.setItem('quote', randomQuote);
  // }
  const fetchQuote = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      
      const xmlData = await response.text();
      const parsedQuote = parseXML(xmlData);
      setQuote(parsedQuote);
      localStorage.setItem('quote', parsedQuote);
    } catch (err) {
      setError(err.message);
    }
  };

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
      console.log(`Quote: "${quote}" added by ${username}`);
    } else {
      console.log("Quote or username not found in localStorage");
    }
  }

  return (
    <div className="container">
      <h1>Random Quote Generator</h1>
      {/* <p>Instructions: Click the button to get a quote!</p>
      <button onClick={generateQuote}>Get Quote</button>
      <button onClick={addQuotes}>Like this quote!</button> 
      <div className="box">
        <p>{quote}</p>
      </div> */}
      {error && <div className="error-message">{error}</div>}
      <Card className="quote-card">
        <Card.Body>
          <Card.Text className="quote-text">
            {quote}
          </Card.Text>
          <div className="button-group">
            <Button 
              variant="success" 
              onClick={fetchQuote}
              className="me-2"
            >
              Get New Quote
            </Button>
            <Button 
              variant="outline-success" 
              onClick={addQuotes}
            >
              Like this quote!
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}