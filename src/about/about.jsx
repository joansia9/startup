import React from 'react';
import './about.css';

export function About(props) {

  const [imageUrl, setImageUrl] = React.useState(null);
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  React.useEffect(() => {
    setImageUrl(`shrek dumb sign.png`);
    setQuote('"Onions have layers, ogres have layers. You get it? We both have layers"');
    setQuoteAuthor('- Shrek the ogre');
  }, []);

  //practicing react:
  
  //type writer effect! 
  const quoteToDisplay = `"Onions have layers, ogres have layers. You get it? We both have layers." - Shrek`;

  React.useEffect(() => {
    let quoteIndex = 0;
    let authorIndex = 0;
    //adding the setInterval method to make the quote appear one letter at a time!! 
    const quoteInterval = setInterval(() => {
      if (quoteIndex < quoteToDisplay.length) { 
        setQuote(quoteToDisplay.substring(0, quoteIndex + 1));
        quoteIndex++;
      } else {
        if (authorIndex < quoteAuthor.length) {
          setQuoteAuthor(quoteAuthor.substring(0, authorIndex + 1));
          authorIndex++;
        } else {
          clearInterval(quoteInterval);
        }
      }
    }, 100);
    return () => clearInterval(quoteInterval);
  } , [quoteToDisplay, quoteAuthor]);


  return (
    <main>
      <div id="Shrek" className="picture-box"><img width="400px" src="shrekOnTheGround.png" alt='random' /></div>

       <h1 id="appTitle">About page</h1>
       <aside><img src = {imageUrl} className= "shreksterSign" ></img></aside> 
      
      <p>
        Hey guys! You like pinterest?
        You need a little pick me up? these quotes will get you THROUGH IT!
        Feeling down or in need of a little encouragement? Sometimes, we all need a boost to get through the tough moments. These carefully selected quotes will inspire and uplift you, providing that extra dose of motivation you need to push forward and overcome any challenges that come your way. Let these words remind you that you are strong, capable, and ready to tackle anything life throws at you. You’ve got this, and these quotes will help you get through it, no matter what!
        This app is designed to help you find and save the words that move you. Don't be beta and trust in the alpha the omega!!! 
      </p>
  
      <div id="quote">
        <div>{quote}</div>
        <div>{quoteAuthor}</div>
      </div>
    </main>

  );
}