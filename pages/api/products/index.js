import { connectToDatabase } from '../../../lib/mongodb'

const API_KEY = process.env.API_KEY || 'admin-secret-key-123'

export default async function handler(req, res) {
  const { method } = req
  let client, db;

  try {
    // Initialize database connection
    console.log('Initializing database connection...');
    const connection = await connectToDatabase();
    client = connection.client;
    db = connection.db;
    
    // Create products collection if it doesn't exist
    console.log('Checking for products collection...');
    const collections = await db.listCollections().toArray();
    if (!collections.find(c => c.name === 'products')) {
      console.log('Creating products collection...');
      await db.createCollection('products');
      console.log('Products collection created successfully');
    } else {
      console.log('Products collection already exists');
    }

    const collection = db.collection('products');

    // Log the incoming request
    console.log('Request method:', method);
    console.log('Request headers:', req.headers);

    if (method === 'GET') {
      const products = await collection.find({}).toArray();
      console.log('GET: Found products:', products.length);
      res.status(200).json(products);
      return;
    }

    if (method === 'POST') {
      console.log('Request body:', req.body);
      
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
      console.log('Closing database connection...');
      await client.close();
    }
  }
}


