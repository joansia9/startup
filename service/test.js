const db = require('./database.js');

async function testQuotes() {
  try {
    // Connect to database
    await db.connectToDatabase();
    
    // Test quotes with different likes and users
    const testQuotes = [
      {
        quote: "Stay hungry, stay foolish",
        author: "Steve Jobs",
        likes: 15,
        likedBy: ["alice@test.com", "bob@test.com", "charlie@test.com"]
      },
      {
        quote: "Be the change you wish to see in the world",
        author: "Mahatma Gandhi",
        likes: 10,
        likedBy: ["alice@test.com", "david@test.com"]
      },
      {
        quote: "Just do it",
        author: "Nike",
        likes: 5,
        likedBy: ["bob@test.com"]
      }
    ];

    // Clear existing quotes
    const collection = db.client.db('likedQuotes').collection('quotes');
    await collection.deleteMany({});
    console.log('Cleared existing quotes');

    // Insert test quotes
    await collection.insertMany(testQuotes);
    console.log('Test quotes inserted successfully');

    // Fetch and display quotes to verify
    const quotes = await db.getTopQuotes();
    console.log('\nFetched quotes:');
    quotes.forEach((quote, index) => {
      console.log(`${index + 1}. "${quote.quote}" - ${quote.author}`);
      console.log(`   Likes: ${quote.likes}`);
      console.log(`   Liked by: ${quote.likedBy.join(', ') || 'No likes yet'}`);
      console.log('---');
    });

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await db.client.close();
  }
}

testQuotes();