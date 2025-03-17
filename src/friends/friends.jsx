import React from 'react';
import './friends.css';

export function Friends() {
  const [quotes, setQuotes] = React.useState([]); // array to hold quotes

  // Load quotes from localStorage when the component mounts
  React.useEffect(() => {
    const storedQuotes = localStorage.getItem('quotes');
  
    if (storedQuotes) {
      setQuotes(JSON.parse(storedQuotes)); // Parse 
    }
  }, []);

  return (
    <main className="friendly stuff">
      <h1>Quotes Recently Liked</h1>

      {/* Table for displaying quotes */}
      <table className="table table-warning table-striped-columns">
        <thead>
          <tr>
            <th>#</th>
            <th>Quote</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {quotes.length > 0 ? (
            // Display each quote in a table row
            quotes.map((quote, index) => (
              <tr key={index}>
              
                <td>{index + 1}</td>
                <td>{quote.quote}</td>
                <td>{quote.username}</td>
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

//BRO TOOK FOREVERRRR BUTTTTT fixed the quotes component first (cleared the local storage and hard coded to see the array then
//if it wasnt an array, create it bruh)
//THENN I had to remember you can access the quote and the username from the friends component... sorry dumb things bro
