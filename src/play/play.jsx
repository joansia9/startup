import React, { useState, useEffect } from 'react'; // Import useEffect
import './play.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Quote } from './Quote';

export function Play({ user }) {
  const [msg, setMsg] = useState('...listening');

  useEffect(() => {
    const interval = setInterval(() => {
      const names = ['Elaine', 'Alix', 'John', 'Jenny', 'Sara', 'Sally', 'Sue', 'Sam'];
      const randomName = names[Math.floor(Math.random() * names.length)];
      // const randomCount = Math.floor(Math.random() * 100); from the video
      const quotes = [
        "The joy we feel has little to do with the circumstances of our lives and everything to do with the focus of our lives. — Russell M. Nelson",
        "When the focus of our lives is on Jesus Christ and His gospel, we can feel joy regardless of what is happening—or not happening—in our lives. — Russell M. Nelson",
        "The Lord loves effort, because effort brings rewards that can’t come without it. — Russell M. Nelson",
        "The Savior is the perfect example of how to live. He is the light that dispels darkness. — Russell M. Nelson",
        "Faith in Jesus Christ is the greatest power available to us in this life. — Russell M. Nelson",
        "Ogres are like onions. We have layers. — Shrek",
        "What are you doing in my swamp?! — Shrek",
        "Better out than in, I always say. — Shrek",
      ]
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      const newMsg = `Your donkey friend, ${randomName}, liked this quote "${randomQuote}"`;
      setMsg(newMsg);
    }, 1000);

    // Cleanup interval on component unmount
    //return () => clearInterval(interval);
  }, []); // Dependency array ensures this runs only once

  return (
    <main>
      <div className="quotes">
        <Quote />
      </div>
      <h1>Hey {user}</h1>

      <ul className="saved">
        <li>{msg}</li>
      </ul>
    </main>
  );
}

// const newQuote = generateRandomQuote();
      // setCurrentQuote(newQuote); // Update the current quote