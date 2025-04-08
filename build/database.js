const { MongoClient, ObjectId } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('likedQuotes');
const collection = db.collection('quotes');

//keeping in track of the users that liked the quotes
async function likeQuote(quoteId, username) {
    try {
      if (!username) { //checking for user 
        console.error('No username provided');
        return false;
      }

      console.log('Attempting to like quote:', quoteId, 'by user:', username); // Debug log

      const result = await collection.updateOne(
        { _id: new ObjectId(quoteId) }, // Using imported ObjectId
        { 
          $inc: { likes: 1 },
          $addToSet: { likedBy: username } //so the username appears only once
        }
      );
      
      console.log('Update result:', result); // Debug log
      return result.modifiedCount > 0;
    } catch (error) {
      console.error('Error liking quote:', error);
      return false;
    }
}

//keeping in track of the quotes
async function addQuoteWithUser(quote, username) {
    try {
      if (!quote || !username) {
        console.error('Quote and username are required');
        return null;
      }

      const newQuote = {
        quote: quote,
        likes: 1, // Start with 1 like since the user who added it likes it
        likedBy: [username] // Initialize likedBy array with the username
      };

      const result = await collection.insertOne(newQuote);
      console.log(`Added quote: "${quote}" liked by ${username}`);
      return result;
    } catch (error) {
      console.error('Error adding quote:', error);
      return null;
    }
}

// Get top liked quotes
async function getTopQuotes() {
  const query = {}; //get all the quotes 
  const options = { 
    sort: { likes: -1 }, // Sort by likes in descending order
    limit: 30, //just the top 10 (can change)
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
  addQuoteWithUser,
  clearDatabase,
  likeQuote,
  client
};