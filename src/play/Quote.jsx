// src/components/Quote.jsx
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './Quote.css';

export function Quote() {
  // const quotes = [
  //   "The joy we feel has little to do with the circumstances of our lives and everything to do with the focus of our lives. — Russell M. Nelson",
  //   "When the focus of our lives is on Jesus Christ and His gospel, we can feel joy regardless of what is happening—or not happening—in our lives. — Russell M. Nelson",
  //   "The Lord loves effort, because effort brings rewards that can't come without it. — Russell M. Nelson",
  //   "The Savior is the perfect example of how to live. He is the light that dispels darkness. — Russell M. Nelson",
  //   "Faith in Jesus Christ is the greatest power available to us in this life. — Russell M. Nelson",
  //   "Ogres are like onions. We have layers. — Shrek",
  //   "What are you doing in my swamp?! — Shrek",
  //   "Better out than in, I always say. — Shrek",
  //   "It's not exactly rocket science, is it? — Shrek",
  //   "You know, sometimes things are more than they appear. — Shrek",
  // ];
  const [quote, setQuote] = useState("Click the button to get a quote!");
  const [error, setError] = useState(null);
  //just like the const [teststuff, setTeststuff] = React.useState("testStuff") from the video tutorial

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
  const handleClick = async () => {
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

  async function addQuotes() {
    console.log('Starting addQuotes function');
    const quote = localStorage.getItem('quote');
    const username = localStorage.getItem('userName');
  
    if (!quote || !username) {
        console.log("Quote or username not found in localStorage:", { quote, username });
        setError('Please generate a quote and make sure you are logged in');
        return;
    }
  
    try {
        console.log('Attempting to save quote:', { quote, username });
        
        const response = await fetch('http://localhost:4000/api/quotes/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quote: quote,
                username: username
            })
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error('Server response:', errorData);
            throw new Error('Failed to save quote to database');
        }

        const result = await response.json();
        console.log('Quote saved successfully:', result);

        // Handle localStorage
        let storedQuotes = [];
        const existingQuotes = localStorage.getItem('quotes');
        if (existingQuotes) {
            try {
                storedQuotes = JSON.parse(existingQuotes);
                if (!Array.isArray(storedQuotes)) {
                    storedQuotes = [];
                }
            } catch (error) {
                console.error('Error parsing stored quotes:', error);
                storedQuotes = [];
            }
        }

        // Add to localStorage
        storedQuotes.push({ quote: quote, username: username });
        localStorage.setItem('quotes', JSON.stringify(storedQuotes));
        console.log(`Quote added to localStorage: "${quote}" by ${username}`);

    } catch (error) {
        console.error('Error in addQuotes:', error);
        setError(error.message || 'Failed to save quote. Please try again.');
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
      <div className="quote-card">
        <div className="quote-content">
          <p className="quote-text">
            {quote}
          </p>
          <div className="button-group">
            <Button onClick={handleClick} className="quote-button get-quote-btn">
              Generate new quote
            </Button>
            <Button onClick={addQuotes} className="quote-button like-quote-btn" >
              Like this quote!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}