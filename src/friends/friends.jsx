import React, { useState, useEffect } from 'react';
import './friends.css';

export function Friends() {
  const [quotes, setQuotes] = useState([]); // array to hold quotes
  const [user, setUser] = useState(null);

  // Simplified user check - no JSON parsing needed
  useEffect(() => {
    console.log('Checking for user...'); // Debug log
    const userString = localStorage.getItem('userName');
    console.log('User from localStorage:', userString); // Debug log
    
    if (userString) {
      // Just set the string directly - no parsing needed
      setUser(userString);
    }
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => { 
      try {
        const response = await fetch('http://localhost:4000/api/quotes/top');
        if (!response.ok) {
          throw new Error('Failed to fetch quotes');
        }
        const data = await response.json();
        console.log('Fetched quotes:', data); // Debug to show quote data
        setQuotes(data);
      } catch (err) {
        console.error('Error fetching quotes:', err);
      }
    };
  
    fetchQuotes();
  }, []);

  return (
    <main className="friendly stuff">
      
      <h1>Quotes Recently Liked</h1>

      <table className="table table-warning table-striped-columns">
        <thead>
          <tr>
            <th>#</th>
            <th>Quote</th>
            <th>Liked By</th>
          </tr>
        </thead>
        <tbody>
          {quotes.length > 0 ? (
            quotes.map((quote, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{typeof quote.quote === 'string' ? quote.quote : JSON.stringify(quote.quote)}</td>
                <td>
                  {quote.likedBy && quote.likedBy.length > 0 ? 
                    quote.likedBy.join(', ')
                    : 'No likes yet'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No quotes available yet!</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}