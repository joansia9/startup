const db = require('./database.js');

async function testQuoteSave() {
  try {
    await db.connectToDatabase();
    console.log('Connected to database');

    const testQuote = {
      quote: "Test quote " + Date.now(),
      username: "testUser"
    };

    const result = await db.addQuoteWithUser(testQuote.quote, testQuote.username);
    console.log('Save result:', result);

    const savedQuotes = await db.getTopQuotes();
    console.log('\nSaved quotes:', savedQuotes);

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await db.client.close();
  }
}

testQuoteSave();