import React from 'react';

//from the video
import { useNavigate } from 'react-router-dom';

//from the specs
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';



export function Login({ userName, authState, onAuthChange }) {
  return (
    //bootstrap to get the green lol
    <main className='container-fluid bg-success text-center'> 
  <div>
    {authState !== AuthState.Unknown && <h1>Welcome {userName} to your epic swamp of quotes!!</h1>}
    {authState === AuthState.Authenticated && (
      <Authenticated
        userName={userName}
        onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)}
      />
    )}
    {authState === AuthState.Unauthenticated && (
      <Unauthenticated
        userName={userName}
        onLogin={(loginUserName) => {
          onAuthChange(loginUserName, AuthState.Authenticated);
        }}
      />
    )}
  </div>
</main>
  );
}

// export function Login({ setUserName }) { //userName, authState, onAuthChange
//   //purpose: when you log in, you automatically go to the play page from the video (last part)
//   const navigate = useNavigate();

//   // State to store the input text
//   const [text, setText] = React.useState('');

//   // Function to handle login
//   function loginUser() {
//     console.log('loginUser', text); // DEBUG
//     setUserName(text);
//     navigate('/play'); // Navigate to the play page

//     //putting user in local storage because we pushed it
//     localStorage.setItem('user', text);
//     //
//   }

//   // Function to handle text input change
//   function textChange(event) {
//     setText(event.target.value); // Update state with the new text
//     console.log('textChange', event.target.value); // DEBUG
//   }

//   //we also want to pass around the user! so we will use pusing state up, so we go to the app.js 
//   // and pass it down to the play.js

//   return (
//     <main>
//       <h2 id="loginHeader">Login</h2>

//       <img src="shrek.png" className="shrekster" alt="Shrek" />

//       <form method="get" action="play.html">

//       {/* {authState === AuthState.Authenticated && (
//           <Authenticated
//             userName={userName}
//             onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)}
//           />
//         )}
//         {authState === AuthState.Unauthenticated && (
//           <Unauthenticated
//             userName={userName}
//             onLogin={(loginUserName) => {
//               onAuthChange(loginUserName, AuthState.Authenticated); */}
//         <div className="login-email-container">
//           <span>@</span>
          
//           <input type="text" placeholder="email" onChange={textChange} />
         
//         </div>
//         <div className="password-container">
//           <span>🔒</span>
//           <input type="password" placeholder="password" onChange={textChange} />

//            {/* ISSUE FIXED: added type="button" to prevent form submission */}
//           <button type="button" onClick={loginUser}>getInTheSwamp</button>
//           <button type="submit">CreateTheSwamp</button>
          
//         </div>
        
//       </form>
//     </main>
//   );
// }
// //checking logging in
// //<div>{text}</div>