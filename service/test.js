const db = require('./database.js');

async function testAllEndpoints() {
    try {
        console.log('\n=== Starting Endpoint Tests ===\n');

        // 1. Test database connection
        await db.connectToDatabase();
        console.log('✓ Database connected successfully');

        // 2. Clear database
        await db.clearDatabase();
        console.log('✓ Database cleared successfully');

        // 3. Add a test quote
        const testQuote = {
            quote: "Test quote from endpoint testing",
            username: "TestUser1"
        };
        const addResult = await db.addQuoteWithUser(testQuote.quote, testQuote.username);
        console.log('✓ Added initial quote:', addResult.insertedId);

        // 4. Test multiple users liking the quote
        const users = ['TestUser2', 'TestUser3', 'TestUser4'];
        for (const user of users) {
            await db.likeQuote(addResult.insertedId, user);
            console.log(`✓ ${user} liked the quote`);
        }

        // 5. Try duplicate like (should not increase count)
        await db.likeQuote(addResult.insertedId, 'TestUser2');
        console.log('✓ Tested duplicate like prevention');

        // 6. Get all quotes and verify
        const allQuotes = await db.getTopQuotes();
        const testQuoteResult = allQuotes.find(q => q._id.toString() === addResult.insertedId.toString());
        
        console.log('\n=== Test Results ===');
        console.log('Quote:', testQuoteResult.quote);
        console.log('Total likes:', testQuoteResult.likes);
        console.log('Liked by:', testQuoteResult.likedBy.join(', '));

        // Verify expectations
        const expectations = [
            {
                test: 'Quote exists',
                passed: !!testQuoteResult,
                expected: true,
                actual: !!testQuoteResult
            },
            {
                test: 'Correct number of likes',
                passed: testQuoteResult.likes === 4, // Initial user + 3 more
                expected: 4,
                actual: testQuoteResult.likes
            },
            {
                test: 'No duplicate users in likedBy',
                passed: new Set(testQuoteResult.likedBy).size === testQuoteResult.likedBy.length,
                expected: true,
                actual: `${testQuoteResult.likedBy.length} unique users`
            }
        ];

        console.log('\n=== Verification Results ===');
        expectations.forEach(exp => {
            console.log(`${exp.passed ? '✓' : '✗'} ${exp.test}`);
            if (!exp.passed) {
                console.log(`  Expected: ${exp.expected}`);
                console.log(`  Actual: ${exp.actual}`);
            }
        });

    } catch (error) {
        console.error('\n❌ Test failed:', error);
    } finally {
        await db.client.close();
        console.log('\n=== Test Completed ===\n');
    }
}

testAllEndpoints();