import React from 'react';
import './friends.css';

export function Friends() {
  const [quotes, setQuotes] = React.useState([]); // array to hold quotes

  // Load quotes from localStorage when the component mounts
  React.useEffect(() => {
    //const storedQuotes = localStorage.getItem('quotes'); //we dont need this because we are using the mongodb

    // if (storedQuotes) {
    //   setQuotes(JSON.parse(storedQuotes)); // Parse 
    // }

    //for the database we need to change the fetch URL to http://localhost:4000/api/quotes/top
    const fetchQuotes = async () => { 
      try {
        const response = await fetch('http://localhost:4000/api/quotes/top');
        if (!response.ok) {
          throw new Error('Failed to fetch quotes');
        }
        const data = await response.json();
        console.log('Fetched quotes:', data); // Debug log
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

      {/* Table for displaying quotes */}
      <table className="table table-warning table-striped-columns">
        <thead>
          <tr>
            <th>#</th>
            <th>Quote</th>
            <th>Likes</th>
            <th>Liked By</th>
          </tr>
        </thead>
        <tbody>
          {quotes.length > 0 ? (
            // Display each quote in a table row
            quotes.map((quote, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{quote.quote}</td>
                <td>{quote.likes}</td>
                <td>
                  {quote.likedBy?.length > 0 ? //are there likes?
                     quote.likedBy.join(', ') //diplay them and join them with commas //if not, display no likes yet
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

//BRO TOOK FOREVERRRR BUTTTTT fixed the quotes component first (cleared the local storage and hard coded to see the array then
//if it wasnt an array, create it bruh)
//THENN I had to remember you can access the quote and the username from the friends component... sorry dumb things bro
