// These lines MUST come first
const express = require('express');
const app = express();
const axios = require('axios');

// Add middleware for parsing JSON
app.use(express.json());

// Router setup
const apiRouter = express.Router();
app.use('/api', apiRouter);

let users = [];
let quotes = [];

//Add this code to service/index.js to allow your code to select a port to run on based on the command line parameters.
const port = process.argv.length > 2 ? process.argv[2] : 4000; 

//making routes (test)
app.get('/api/test', (req, res) => {
    res.json({ message: 'wazzup World' });
});

//Add this code to service/index.js to cause Express static middleware to serve files from the public directory once your code has been deployed to your AWS server.
app.use(express.static('public'));

//SYNTAX FOR API ROUTES apiRouter.METHOD(PATH, MIDDLEWARE, HANDLER)

apiRouter.post('/auth/create', async (req, res) => {
    const { email, password } = req.body;
    //(fail) if email and password are not provided, return 400 error
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    //(success) if email and password are provided, create user
    const user = await createUser(email, password);
    res.status(201).json({ email: user.email }); //(success) if user is created, return 201 status and email
});


async function createUser(email, password) {
    const user = { email, password };
    users.push(user);
    return user;
}

apiRouter.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    //(fail)if email and password are not provided, return 400 error
    if (!email || !password) {
        return res.status(400).json({ error: 'no email or password' });
    }
    //(fail) if user is not found, return 401 error
    const user = await findUser(email, password);
    if (!user) {
        return res.status(401).json({ error: 'unauthorized' });
    }
    //BUT (success)if user is found, return 200 status and email
    return res.status(200).json({ email: user.email });
});

async function findUser(email, password) {
    //(fail) if email and password are not provided, return null
    if (!email || !password) { 
        return null;
    }
    //(fail) if user is not found, return null
    const user = users.find(u => u.email === email);
    if (!user) {
        return null;
    }
    //(fail) if password is not correct, return null
    if (user.password !== password) {
        return null;
    }
    //(success) if user is found and password is correct, return user
    return user;
}


apiRouter.delete('/auth/logout', async (req, res) => {
    // Logs out a user
});

//ideas to make the app more interactive

//GET /api/quotes – Get all quotes
// POST /api/quotes – Add a new quote
// DELETE /api/quotes/:id – Delete a quote by ID
// GET /api/quotes/random – Get a random quote
// GET /api/quotes/search – Search quotes by text
// GET /api/quotes/author/:author – Get quotes by author


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//api https://github.com/public-apis/public-apis?tab=readme-ov-file