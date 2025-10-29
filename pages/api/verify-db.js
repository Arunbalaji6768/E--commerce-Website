import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const MONGODB_URI = process.env.MONGODB_URI;
    const MONGODB_DB = process.env.MONGODB_DB || 'nextjs-ecommerce';

    if (!MONGODB_URI) {
        return res.status(500).json({ error: 'MongoDB URI is not defined' });
    }

    let client;
    try {
        // Attempt to connect
        console.log('Attempting to connect to MongoDB...');
        client = await MongoClient.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        // Get database instance
        const db = client.db(MONGODB_DB);
        
        // Test database operations
        const collections = await db.listCollections().toArray();
        
        // Create a test collection if none exists
        if (collections.length === 0) {
            await db.createCollection('test_collection');
            console.log('Created test collection');
        }

        // Return connection status and details
        res.status(200).json({
            status: 'success',
            message: 'Successfully connected to MongoDB',
            connectionDetails: {
                database: MONGODB_DB,
                collections: collections.map(c => c.name),
                uri: MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@') // Hide credentials
            },
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to connect to MongoDB',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    } finally {
        if (client) {
            await client.close();
        }
    }
}