import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'products.json')
const API_KEY = 'admin-secret-key-123'

function readProducts() {
  try { return JSON.parse(fs.readFileSync(filePath,'utf8')) } catch { return [] }
}
function writeProducts(products){ fs.writeFileSync(filePath, JSON.stringify(products, null, 2)) }

export default function handler(req,res){
  const { method } = req
  if (method==='GET'){
    try { res.status(200).json(readProducts()) } catch { res.status(500).json({error:'Failed to fetch products'}) }
    return
  }
  if (method==='POST'){
    if (req.headers['x-api-key'] !== API_KEY) return res.status(401).json({error:'Unauthorized. Invalid API key.'})
    try {
      const products = readProducts()
      const newProduct = { id: Date.now().toString(), ...req.body, lastUpdated: new Date().toISOString() }
      products.push(newProduct)
      writeProducts(products)
      res.status(201).json(newProduct)
    } catch { res.status(500).json({error:'Failed to create product'}) }
    return
  }
  res.setHeader('Allow',['GET','POST']); res.status(405).end(`Method ${method} Not Allowed`)
}


