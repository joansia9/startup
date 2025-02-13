import React from 'react';
import './friends.css';

export function Friends() {
  return (
    <main className='friendly stuff'>
      <h1> PLACEHOLDER FOR DATABASE for storing liked quotes </h1>
      
      <img src = "shrekFriends.png" className= "shrekFriends" ></img>

      <table>
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
    </main>
  );
}