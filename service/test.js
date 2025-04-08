const db = require('./database.js');

async function testTopQuotes() {
  try {
    // 1. Connect to database
    await db.connectToDatabase();
    console.log('Connected to database');

    // 2. Add some test quotes with different like counts
    const testQuotes = [
      {
        quote: "Test quote 1",
        author: "Author 1",
        likes: 10,
        likedBy: ["user1", "user2", "user3"]
      },
      {
        quote: "Test quote 2",
        author: "Author 2",
        likes: 5,
        likedBy: ["user1"]
      },
      {
        quote: "Test quote 3",
        author: "Author 3",
        likes: 15,
        likedBy: ["user1", "user2", "user3", "user4"]
      }
    ];

    // 3. Clear existing quotes
    await db.clearDatabase();
    console.log('Cleared old quotes');

    // 4. Insert test quotes
    const collection = db.client.db('likedQuotes').collection('quotes');
    await collection.insertMany(testQuotes);
    console.log('Added test quotes');

    // 5. Get top quotes and display them
    const topQuotes = await db.getTopQuotes();
    console.log('\nTop Liked Quotes:');
    topQuotes.forEach((quote, index) => {
      console.log(`${index + 1}. "${quote.quote}"`);
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

testTopQuotes();