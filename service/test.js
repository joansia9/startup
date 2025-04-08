const db = require('./database.js');

async function testLikedByUsers() {
  try {
    // Connect to database
    await db.connectToDatabase();
    console.log('Connected to database');
    
    // Test quotes with different users who liked them
    const testQuotes = [
      {
        quote: "Stay hungry, stay foolish",
        author: "Steve Jobs",
        likes: 3,
        likedBy: ["Alice", "Bob", "Charlie"]
      },
      {
        quote: "Be the change you wish to see in the world",
        author: "Mahatma Gandhi",
        likes: 2,
        likedBy: ["David", "Eve"]
      },
      {
        quote: "Just do it",
        author: "Nike",
        likes: 1,
        likedBy: ["Frank"]
      }
    ];

    // Clear existing quotes first
    const collection = db.client.db('likedQuotes').collection('quotes');
    await collection.deleteMany({});
    console.log('Cleared existing quotes');

    // Insert test quotes
    await collection.insertMany(testQuotes);
    console.log('Test quotes with likes inserted successfully');

    // Fetch and display quotes to verify
    const quotes = await db.getTopQuotes();
    console.log('\nFetched quotes:');
    quotes.forEach((quote, index) => {
      console.log(`${index + 1}. "${quote.quote}" - ${quote.author}`);
      console.log(`   Likes: ${quote.likes}`);
      console.log(`   Liked by: ${quote.likedBy.join(', ')}`);
      console.log('---');
    });

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await db.client.close();
  }
}

testLikedByUsers();