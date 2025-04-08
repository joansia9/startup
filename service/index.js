// These lines MUST come first
const express = require('express'); //middleware, starts the server
const app = express(); 
const cors = require('cors'); //middleware, enables backend to accept requests from different domains/origins
const cookieParser = require('cookie-parser'); //middleware, parses cookies (when a user logsin, you set an auth token in a cookie)
const uuid = require('uuid'); //middleware, generates a unique id for each user
const db = require('./database.js');

const corsOptions = {
    origin: true, // Allow all origins in development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie']
};

// Add middleware for parsing JSON, cookies, and CORS
app.use(express.json()); //middleware, parses JSON bodies in requests
app.use(cookieParser()); //middleware, parses cookies in requests

// Add CORS middleware
app.use(cors(corsOptions));

// Debug middleware - add this first
app.use((req, res, next) => {
    console.log('Incoming request:', {
        method: req.method,
        path: req.path,
        body: req.body
    });
    next();
});

// Router setup
const apiRouter = express.Router();
app.use('/api', apiRouter);

let users = [];
let quotes = [];

// Define the auth cookie name
const authCookieName = 'token';

// Add this code to service/index.js to allow your code to select a port to run on based on the command line parameters.
const port = process.argv.length > 2 ? process.argv[2] : 4000; 

// making routes (test)
app.get('/api/test', (req, res) => {
    console.log('Test request received');
    res.json({ message: 'wazzup World' });
});

// Test endpoint to make sure server is running
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' }); // Send JSON instead of trying to serve HTML
  });

// Add this code to service/index.js to cause Express static middleware to serve files from the public directory once your code has been deployed to your AWS server.
app.use(express.static('public'));

// SYNTAX FOR API ROUTES apiRouter.METHOD(PATH, MIDDLEWARE, HANDLER)
    //

//create a new user
apiRouter.post('/auth/create', async (req, res) => {
    //curl -X POST http://localhost:4000/api/quotes -H "Content-Type: application/json" -d '{"email": "test@example.com", "password": "secret"}'
    console.log('create post received');
    try { //try to create a NEW user
        console.log('Create request body:', req.body);
        //did they give an email or password?
        if (!req.body.email || !req.body.password) { //body because it's the BODY of the request or in other words the data they sent to the server
            //The envelope (headers) contains delivery information
            //The letter inside (body) contains the actual message
            return res.status(400).json({ error: 'Email and password are required' });
        }
        //does the user already exist?
        if (await findUser(req.body.email)) {
            return res.status(409).json({ error: 'User already exists' });
        }
        //create the user
        const user = await createUser(req.body.email, req.body.password);
        //creating auth token
        //why is this important? bc Creates a unique token (like a secret key) for the user
        user.token = uuid.v4(); //generates a random string like "550e8400-e29b-41d4-a716-446655440000"
        //setting the auth cookie
        setAuthCookie(res, user.token); //stores the token
        //returning the user's email and success
        return res.status(201).json({ email: user.email });

    } catch (error) {
        console.error('Create error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

async function createUser(email, password) {
    const user = { email, password };
    users.push(user);
    return user;
}

apiRouter.post('/auth/login', async (req, res) => { //same idea as createUser
    try { //try to log back in assuming that they have an account but check first lol
        console.log('Login request body:', req.body);
        //check to see if they gave the email and password
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        //check to see if the user exists and if the password is correct!! 
        const user = await findUser(req.body.email); //await is used to wait for the findUser function to finish! 
        //does the user exist and does the password match? 
        if (!user || user.password !== req.body.password) { 
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        user.token = uuid.v4(); //create the token
        setAuthCookie(res, user.token); //store the token
        return res.json({ email: user.email }); //return the email/success! 
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

async function findUser(email) {
    return users.find(u => u.email === email);
}

apiRouter.delete('/auth/logout', async (req, res) => {
    console.log('logout received');
    try {

        //clear the cookie
        //from class cookies mean the token
        res.clearCookie(authCookieName);
        return res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//from the example code
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true, //only send the cookie over HTTPS in production
        httpOnly: true, //prevents client-side JavaScript from accessing the cookie
        sameSite: 'strict', //prevents the cookie from being sent along with requests to other sites
        // maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
}

// Quote-related endpoints

// ideas to make the app more interactive
// GET /api/quotes – Get all quotes
// POST /api/quotes – Add a new quote
// DELETE /api/quotes/:id – Delete a quote by ID
// GET /api/quotes/random – Get a random quote
// GET /api/quotes/search – Search quotes by text
// GET /api/quotes/author/:author – Get quotes by author

// Test endpoint to verify server is working
apiRouter.get('/test', (req, res) => {
    res.json({ message: 'Server is working' });
});

// Quote save endpoint
apiRouter.post('/quotes/save', async (req, res) => {
    console.log('Quote save endpoint hit:', req.body);
    try {
        const { quote, username } = req.body;
        
        if (!quote || !username) {
            console.log('Missing quote or username');
            return res.status(400).json({ error: 'Quote and username are required' });
        }

        const collection = db.client.db('likedQuotes').collection('quotes');
        const newQuote = {
            quote: quote,
            likes: 1,
            likedBy: [username]
        };

        await db.connectToDatabase(); // Make sure we're connected
        const result = await collection.insertOne(newQuote);
        console.log('Quote saved successfully:', result);
        
        res.status(201).json({ 
            success: true, 
            message: 'Quote saved successfully',
            quoteId: result.insertedId 
        });
    } catch (error) {
        console.error('Server error saving quote:', error);
        res.status(500).json({ error: 'Failed to save quote' });
    }
});

// Your existing quotes endpoint for fetching quotes from Forismatic API
apiRouter.post("/quotes", async (req, res) => {
    console.log('quotes received');
    //forismatic api
    const url = "http://api.forismatic.com/api/1.0/";
    console.log('url:', url);
    //parameters for the api (from the website)
    const params = new URLSearchParams({
        method: "getQuote",
        key: "457653",
        format: "xml",
        lang: "en",
    });
    console.log('params:', params);
    try { //try to get the quote
        //fetching the quote from the API
        const response = await fetch(url, { //waits for the fetch to finish
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params, //parameters for the api
        });
        
        console.log('response:', response);
        if (!response.ok) throw new Error("Failed to fetch quote"); //if the quote is not found, throw an error

        //getting the quote
        const xmlData = await response.text(); //get the quote
        res.send(xmlData); // Sends raw XML response
    } catch (error) {
        console.error("Error fetching quote:", error);
        res.status(500).json({ error: "Failed to fetch quote" });
    }

    //ways to test for the quote using curl:
    //curl -X POST http://localhost:4000/api/quotes
    //curl -X POST http://localhost:4000/api/quotes -H "Content-Type: application/json"
});

//API endpoints for the top quotes function in database.js
// apiRouter.get('/quotes/top', async (req, res) => {
//     try {
//         const topQuotes = await db.getTopQuotes();
//         console.log('Sending quotes:', topQuotes); //debugggggg
//         res.json(topQuotes);
//     } catch (error) {
//         console.error('Error:', error); //debugggggggggg 
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

apiRouter.delete('/quotes/clear', async (req, res) => {
    try {
      const collection = db.client.db('likedQuotes').collection('quotes');
      await collection.deleteMany({});
      console.log('Database cleared successfully');
      res.json({ message: 'Database cleared successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to clear database' });
    }
  });

  //who liked the quote?
apiRouter.post('/quotes/:id/like', async (req, res) => {
    try {
      let username;
      
      // First try to get username from request body (localStorage)
      if (req.body.username) {
        username = req.body.username;
      } else {
        // Fallback to auth token method
        const authToken = req.cookies.token;
        const user = users.find(u => u.token === authToken);
        
        if (!user) {
          return res.status(401).json({ error: 'Must be logged in to like quotes' });
        }
        username = user.email;
      }
  
      // Like the quote with the username
      await db.likeQuote(req.params.id, username);
      res.json({ success: true });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to like quote' });
    }
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log('Available endpoints:');
    console.log('- POST /api/quotes/save');
    console.log('- POST /api/quotes');
});

//api https://github.com/public-apis/public-apis?tab=readme-ov-file

//command for curl: curl -X POST http://localhost:4000/api/auth/create -H "Content-Type: application/json" -d '{"email": "test@example.com", "password": "secret"}'

//come