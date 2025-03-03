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


  return (
    <main className='friendly stuff'>
      


      <img src = "shrekFriends.png" className= "shrekFriends" ></img>

      <h1> Quotes recently liked </h1>
      <h2>{quote}</h2>
      <h3> from {user}</h3>
      {/* <th>#</th> */}
            {/* <th>Name</th> */}
            {/* <th>quote</th>
            <th>Date</th> */}
            

            {/* <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>liked quote</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>shrek</td>
                  <td>liked quote "The only way to take sorrow out of death is to take love out of life."</td>
                  <td>Jan 20, 2025</td>
                </tr>
                <tr>
                  <td>donkey</td>
                  <td>liked quote "My dear brothers and sisters, the joy we feel has little to do with the circumstances of our lives and everything to do with the focus of our lives."</td>
                  <td>Feb 21, 2025</td>
                </tr>
                <tr>
                  <td>puss</td>
                  <td>liked quote "Even the best teams can fail. Celebrities can fade. There is only One in whom your faith is always safe, and that is in the Lord Jesus Christ. And you need to let your faith show!"</td>
                  <td>March 3, 2025</td>
                </tr>
              </tbody>
              </table>
                   */}
          </main>
  );
}


/* <table>
<thead>
  <tr>
    <th>Name</th>
    <th>liked quote</th>
    <th>Date</th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>shrek</td>
    <td>liked quote "The only way to take sorrow out of death is to take love out of life."</td>
    <td>Jan 20, 2025</td>
  </tr>
  <tr>
    <td>donkey</td>
    <td>liked quote "My dear brothers and sisters, the joy we feel has little to do with the circumstances of our lives and everything to do with the focus of our lives."</td>
    <td>Feb 21, 2025</td>
  </tr>
  <tr>
    <td>puss</td>
    <td>liked quote "Even the best teams can fail. Celebrities can fade. There is only One in whom your faith is always safe, and that is in the Lord Jesus Christ. And you need to let your faith show!"</td>
    <td>March 3, 2025</td>
  </tr>
</tbody>
</table> */