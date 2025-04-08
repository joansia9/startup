const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('likedQuotes');
const collection = db.collection('quotes');

//keeping in track of the users that liked the quotes
async function likeQuote(quoteId, userEmail) {
    try {
      await collection.updateOne(
        { _id: new ObjectId(quoteId) },
        { 
          $inc: { likes: 1 },
          $addToSet: { likedBy: userEmail } // Add user's email to likedBy array
        }
      );
      return true;
    } catch (error) {
      console.error('Error liking quote:', error);
      return false;
    }
  }

//keeping in track of the quotes
async function addQuote(quote, author) {
    const newQuote = {
      quote: quote,
      author: author,
      likes: 0,
      likedBy: [] // Array to store user emails who liked this quote
    };
    return await collection.insertOne(newQuote);
  }

// Get top liked quotes
async function getTopQuotes() {
  const query = {}; //get all the quotes 
  const options = {
    sort: { likes: -1 }, //sort the quotes in descending order of likes
    limit: 10, //just the top 10 (can change)
    projection: {  // FIXME: Add this to specify which fields to return
      quote: 1,
      author: 1,
      likes: 1,
      likedBy: 1  // Include the likedBy array
    }
  };
  return await collection.find(query, options).toArray();
}

// Connect to database from test.js
async function connectToDatabase() {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log(`Connected to database at ${config.hostname}`);
    return true;
  } catch (ex) {
    console.error(`Failed to connect to database: ${ex.message}`);
    return false;
  }
}

//clearubg thge database
async function clearDatabase() {
  try {
    await collection.deleteMany({});
    console.log('Database cleared successfully');
  } catch (error) {
    console.error('Error clearing database:', error);
  }
}

module.exports = {
  connectToDatabase,
  getTopQuotes,
  addQuote,
  clearDatabase,
  likeQuote,
  client
};