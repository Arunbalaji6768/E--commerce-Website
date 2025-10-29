import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB || 'nextjs-ecommerce'

export default async function handler(req, res) {
  try {
    console.log('Testing MongoDB connection...')
    const client = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    const db = client.db(MONGODB_DB)
    const collections = await db.listCollections().toArray()
    
    await client.close()
    
    res.status(200).json({
      status: 'success',
      message: 'Successfully connected to MongoDB',
      database: MONGODB_DB,
      collections: collections.map(c => c.name)
    })
  } catch (error) {
    console.error('Database connection error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to connect to MongoDB',
      error: error.message
    })
  }
}