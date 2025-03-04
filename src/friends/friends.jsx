import React from 'react';
import './friends.css';

export function Friends() {

const [quote, setQuote] = React.useState('');
const [user, setUser] = React.useState('');

  React.useEffect(() => {
    const quoteText = localStorage.getItem('quote');
    const user = localStorage.getItem('userName');
    //debug
    console.log('quoteText', quoteText);
    console.log('userName', user);
    if (quoteText) {
      // const parseQuote = JSON.parse(quoteText); for some reason this did not work! 
      //setQuote(JSON.stringify(quoteText));
      const jsonString = JSON.stringify(quoteText)
      setQuote(jsonString)
      const jsonUser = JSON.stringify(user);
      setUser(jsonUser);
      //checking if this actually converts correctly
      console.log('jsonstring ' + jsonString + ' jsonUser ' + jsonUser);
    }
  }, []);

  //function to add a new quote
  const addQuote = () => {
    if (quote && user) {
      const newQuote = {text: quote, user: user};
      const updatedQuotes = {...quotes, newQuote};
      setQuotes(updatedQuotes);
      localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
      setQuote('');
      setUser('');
    } else {
      alert('Please enter a quote and user');
    }

    //getting the quotes
    const [quotes, setQuotes] = React.useState({});
    React.useEffect(() => {
      const quotesText = localStorage.getItem('quote');
      if (quotesText) {
        setquotes(JSON.parse(quotesText));
      }
    }, []);

    // Demonstrates rendering an array with React
  const quoteRows = [];
  if (quotes.length) {
    for (const [i, quote] of quotes.entries()) {
      quoteRows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{quote.quote}</td>
        </tr>
      );
    }
  } else {
    quoteRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to quote</td>
      </tr>
    );
  }


  //from the specs! 
//   const quoteRows = [];
// if (quote.length) {
//   for (const [i, quote] of quote.entries()) {
//     quoteRows.push(
//       <tr key={i}>
//         <td>{i}</td>
//         {/* <td>{quote.name.split('@')[0]}</td> */}
//         <td>{quote.quote}</td>
//         {/* <td>{quote.date}</td> */}
//       </tr>
//     );
//   }
// } else {
//   quoteRows.push(
//     <tr key='0'>
//       <td colSpan='4'>nothing yet</td>
//     </tr>
//   );
// }

  }
  return (
    <main className='friendly stuff'>

      <table className='table table-warning table-striped-columns'>

        <img src = "shrekFriends.png" className= "shrekFriends" ></img>

        <h1> Quotes recently liked </h1>

        <h2>{quote}</h2>

        <h3> from {user}</h3> 

      </table>

    </main>
  );
}