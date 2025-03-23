// These lines MUST come first
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');

// Add middleware for parsing JSON, cookies, and CORS
app.use(express.json());
app.use(cookieParser());

// Configure CORS with specific options
const corsOptions = {
    origin: true, // Allow all origins in development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie']
};

// Add CORS middleware
app.use(cors(corsOptions));

// Add debugging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
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

// Add this code to service/index.js to cause Express static middleware to serve files from the public directory once your code has been deployed to your AWS server.
app.use(express.static('public'));

// SYNTAX FOR API ROUTES apiRouter.METHOD(PATH, MIDDLEWARE, HANDLER)

apiRouter.post('/auth/create', async (req, res) => {
    console.log('create post received');
    try {
        console.log('Create request body:', req.body);
        //did they give an email or password
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        //does the user already exist
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

apiRouter.post('/auth/login', async (req, res) => {
    try {
        console.log('Login request body:', req.body);
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await findUser(req.body.email);
        if (!user || user.password !== req.body.password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        return res.json({ email: user.email });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

async function findUser(email) {
    return users.find(u => u.email === email);
}

apiRouter.delete('/auth/logout', async (req, res) => {
    try {
        res.clearCookie(authCookieName);
        return res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
}

// Quote-related endpoints
apiRouter.get('/quotes', (req, res) => {
    try {
        return res.json(quotes);
    } catch (error) {
        console.error('Get quotes error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

apiRouter.post('/quotes', (req, res) => {
    try {
        if (!req.body.text || !req.body.author) {
            return res.status(400).json({ error: 'Quote text and author are required' });
        }

        const newQuote = {
            id: uuid.v4(),
            text: req.body.text,
            author: req.body.author,
            createdAt: new Date().toISOString()
        };

        quotes.push(newQuote);
        return res.status(201).json(newQuote);
    } catch (error) {
        console.error('Create quote error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// ideas to make the app more interactive
// GET /api/quotes – Get all quotes
// POST /api/quotes – Add a new quote
// DELETE /api/quotes/:id – Delete a quote by ID
// GET /api/quotes/random – Get a random quote
// GET /api/quotes/search – Search quotes by text
// GET /api/quotes/author/:author – Get quotes by author

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//api https://github.com/public-apis/public-apis?tab=readme-ov-file

//command for curl: curl -X POST http://localhost:4000/api/auth/create -H "Content-Type: application/json" -d '{"email": "test@example.com", "password": "secret"}'

//come