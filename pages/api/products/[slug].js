import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'products.json')
const API_KEY = 'admin-secret-key-123'

function readProducts() { try { return JSON.parse(fs.readFileSync(filePath,'utf8')) } catch { return [] } }
function writeProducts(products){ fs.writeFileSync(filePath, JSON.stringify(products, null, 2)) }

export default function handler(req,res){
  const { method } = req
  const { slug, id } = req.query
  if (method==='GET'){
    try{
      const p = readProducts().find(p=>p.slug===slug || p.id===slug || p.id===id)
      if(!p) return res.status(404).json({error:'Product not found'})
      res.status(200).json(p)
    }catch{ res.status(500).json({error:'Failed to fetch product'}) }
    return
  }
  if (method==='PUT'){
    if (req.headers['x-api-key'] !== API_KEY) return res.status(401).json({error:'Unauthorized. Invalid API key.'})
    try{
      const products = readProducts()
      const i = products.findIndex(p=>p.slug===slug || p.id===slug || p.id===id)
      if(i===-1) return res.status(404).json({error:'Product not found'})
      products[i] = { ...products[i], ...req.body, lastUpdated: new Date().toISOString() }
      writeProducts(products)
      res.status(200).json(products[i])
    }catch{ res.status(500).json({error:'Failed to update product'}) }
    return
  }
  res.setHeader('Allow',['GET','PUT']); res.status(405).end(`Method ${method} Not Allowed`)
}


