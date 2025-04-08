# startup

## Description of Each technology
- **HTML**: Provides the basic structure and organization of the quotes app
- **CSS**: Color and maybe pictures associated with the quotes to create a "calming" feeling for the users  
- **React**: After logging in, users have the ability to press a button to generate random quotes and like the quote
- **Web Service**: We plan to use **Kanye.rest** **Buddah Quotes API**  **Dictum api** to generate quotes.  
- **Authentication**: Users must log in to access the app's features.  
- **Database**: Stores users' favorite quotes and there will be a live likes list.  
- **WebSocket**: Enables real-time chat functionality, allowing users to discuss their quotes with friends and see their liked quotes.


## Elevator Pitch
** Shrek once wisely said, "Onions have layers. Ogres have layers. You get it? We both have layers." Just like Shrek, we all have layers waiting to be uncovered. Dive into your layers with inspiring quotes and messages. Explore who you truly are and connect with others who resonate with your journey! With just a tap of a button, discover a world of layers. **

## Key features
### 💬 **Generate Feature**  
- Users can press a button to generate a unique quote

### ⭐ **Favorite Feature**  
  - Users can **star** (like) quotes and create a personalized **Favorites list**.  
- This list is **individualized** and allows users to view their **friends' favorite albums**.

### 👍 **Likes Feature**  
- Users can **chat** with friends about their favorite albums and songs.  
- The chat feature is **real-time**, powered by **WebSocket**.

## Rough sketches 
![Untitled (Draft)-1]()[startupSpec.pdf](https://github.com/user-attachments/files/18581441/startupSpec.pdf)

## HTML 
 HTML pages - 4 pages
 - Links - there will be a login, favorite, about, and play page
 - Text - the quotes and favorite quotes will be in text format
 - Images - I added images of shrek
 - DB/Login - In the login page there will be a authentication and in the favorites class, there will hold a database of favorites
 - WebSocket - There will be a live likes and an API generating the quotes
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 73e1651 (CSS update)

## CSS
- Header, footer, and main content body [x]
- Navigation elements: added color contrasts and hover effects on buttons and titles
- Responsive to window resizing: responsive to displays
- Application elements: Used good contrast and whitespace/padding/margins, and buttons
- Application text content: Consistent fonts and a font hierarchy
- Application images: responsive images 
<<<<<<< HEAD
=======
>>>>>>> 91520de (trying again)
=======
>>>>>>> 73e1651 (CSS update)
>>>>>>>
## REACT pt1
- [x] **Bundled and transpiled** - done!
- [x] **Components** - Login, quote generator, favorite quotes of friends.
  - [x] **login** - When you press enter or the login button it takes you to the quote generator page
  - [x] **database** - Displayed the favorites of other users. Currently using local storage.
  - [x] **WebSocket** - real time communication between users and quotes. There will be a function of printing the favorites of other users
  - [x] **application logic** - The highlight and list users change based up the user's selections of favorite quotes.
- [x] **Router** - Routing between login and quote components.
- [x] **Hooks** - used onClick button for the quote but not fully functional yet

## React Phase 2: Reactivity deliverable

For this deliverable I used JavaScript and React so that the application completely works for a single user. I also added placeholders for future technology.

- [x] **All functionality implemented or mocked out** - Everything is working! Votes stored in local storage. `setInterval` used to simulate grab favorites quotes and previously liked quotes.
- [x] **Hooks** - Used `useState` and `useEffect` on the quotes view
- [x] setInterval to print out the quotes people have liked in live time
- [x] useState used for log in !
- [x] useEffect practiced on the about component to make a typewriter effect but also in the play component to generate the random quotes!
- [x] login finished!!   


## Service deliverable

For this deliverable I added backend endpoints that receives votes and returns the voting totals.

- [x] **Node.js/Express HTTP service** - done!
- [x] **Static middleware for frontend** - done!
- [x] **Calls to third party endpoints** - done! (quotes forismatic)
- [x] **Backend service endpoints** - Placeholders for login that stores the current user on the server. Endpoints for log in and quotes and saving quotes
- [x] **Frontend calls service endpoints** - I did this using the fetch functions (fetching the quotes, users that liked the quotes)
- [x] **Supports registration, login, logout, and restricted endpoint** - Login only exists on the frontend. 


## DB/Login deliverable

For this deliverable I associate the votes with the logged in user. I stored the votes in the database.

- [x] **Stores data in MongoDB** - done!
- [x] **Use MongoDB to store credentials** - Stores both user and their quotes -> took alot of time because I tried to take into account duplicates and lists of users that liked quotes and most liked quotes
