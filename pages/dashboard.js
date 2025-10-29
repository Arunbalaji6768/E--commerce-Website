import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Head from 'next/head'

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'products.json')
  const products = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const totalProducts = products.length
  const lowStockProducts = products.filter(p=>p.inventory<10)
  const totalValue = products.reduce((sum,p)=>sum+(p.price*p.inventory),0)
  const lastUpdated = products.map(p=>new Date(p.lastUpdated)).sort((a,b)=>b-a)[0]
  return { props: { totalProducts, lowStockCount: lowStockProducts.length, totalValue, lastUpdated: lastUpdated?lastUpdated.toISOString():null } }
}

export default function Dashboard({ totalProducts, lowStockCount, totalValue, lastUpdated }) {
  return (
    <>
      <Head><title>Dashboard</title></Head>
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>
      <div className="container">
        <h1>📊 Inventory Dashboard</h1>
        <div className="product-grid" style={{marginTop:'1.5rem'}}>
          <div className="card"><h3>Total Products</h3><div className="product-price">{totalProducts}</div></div>
          <div className="card"><h3>Low Stock</h3><div className="product-price">{lowStockCount}</div></div>
          <div className="card"><h3>Total Inventory Value</h3><div className="product-price">${totalValue.toFixed(2)}</div></div>
        </div>
        {lastUpdated && <p style={{marginTop:'1rem', color:'#666'}}>Last Update: {new Date(lastUpdated).toLocaleString()}</p>}
      </div>
    </>
  )
}


