import React from 'react';
import './friends.css';

export function Friends() {
  const [quotes, setQuotes] = React.useState([]); // Use an array to hold quotes

  // Load quotes from localStorage when the component mounts
  React.useEffect(() => {
    // Fetch the quotes array from localStorage
    const storedQuotes = localStorage.getItem('quotes');
  
    if (storedQuotes) {
      setQuotes(JSON.parse(storedQuotes)); // Parse and store the quotes in state
    }
  }, []); // Empty dependency array ensures this runs only once on mount

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
                <td>{quote}</td>
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
