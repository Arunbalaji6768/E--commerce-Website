import { MongoClient } from 'mongodb'

const API_KEY = process.env.API_KEY || 'admin-secret-key-123'
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB || 'nextjs-ecommerce'

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable')
}

async function connectToDatabase() {
  const client = await MongoClient.connect(MONGODB_URI)
  const db = client.db(MONGODB_DB)
  return { client, db }
}

export default async function handler(req, res) {
  const { method } = req

  const { client, db } = await connectToDatabase()
  const collection = db.collection('products')

  try {
    if (method === 'GET') {
      const products = await collection.find({}).toArray()
      res.status(200).json(products)
      return
    }

    if (method === 'POST') {
      if (req.headers['x-api-key'] !== API_KEY) {
        return res.status(401).json({ error: 'Unauthorized. Invalid API key.' })
      }

      const newProduct = {
        id: Date.now().toString(),
        ...req.body,
        lastUpdated: new Date().toISOString()
      }

      await collection.insertOne(newProduct)
      res.status(201).json(newProduct)
      return
    }

    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ error: 'Database operation failed' })
  } finally {
    await client.close()
  }
}


