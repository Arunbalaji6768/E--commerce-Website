import { MongoClient } from 'mongodb'

const API_KEY = process.env.API_KEY || 'admin-secret-key-123'
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB || 'nextjs-ecommerce'

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable')
}

async function connectToDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    const client = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB.');
    
    const db = client.db(MONGODB_DB);
    // Test the connection by listing collections
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    return { client, db };
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  const { method } = req
  let client;

  try {
    // Log the incoming request
    console.log('Request method:', method);
    console.log('Request headers:', req.headers);
    if (method === 'POST') {
      console.log('Request body:', req.body);
    }

    // Connect to database
    const connection = await connectToDatabase();
    client = connection.client;
    const db = connection.db;
    const collection = db.collection('products');

    if (method === 'GET') {
      const products = await collection.find({}).toArray();
      console.log('GET: Found products:', products.length);
      res.status(200).json(products);
      return;
    }

    if (method === 'POST') {
      // Verify API key
      console.log('Received API key:', req.headers['x-api-key']);
      console.log('Expected API key:', API_KEY);
      
      if (req.headers['x-api-key'] !== API_KEY) {
        console.log('API key mismatch');
        return res.status(401).json({ error: 'Unauthorized. Invalid API key.' });
      }

      const newProduct = {
        id: Date.now().toString(),
        ...req.body,
        lastUpdated: new Date().toISOString()
      };

      console.log('Attempting to insert product:', newProduct);
      
      const result = await collection.insertOne(newProduct);
      console.log('Insert result:', result);
      
      res.status(201).json(newProduct);
      return;
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    res.status(500).json({ 
      error: 'Database operation failed',
      details: error.message 
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
}


