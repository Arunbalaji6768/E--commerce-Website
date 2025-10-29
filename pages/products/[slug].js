import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Head from 'next/head'

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'products.json')
  const products = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  return { paths: products.map(p=>({ params:{ slug: p.slug }})), fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'products.json')
  const products = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const product = products.find(p=>p.slug===params.slug)
  if (!product) return { notFound: true }
  return { props: { product }, revalidate: 60 }
}

export default function ProductDetail({ product }) {
  return (
    <>
      <Head><title>{product.name} - Product</title></Head>
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>
      <div className="container">
        <div className="card">
          <div className="product-image" style={{height:'300px', fontSize:'6rem'}}>{product.category==='Electronics'?'📱':'🎵'}</div>
          <h1>{product.name}</h1>
          <div className="product-price" style={{fontSize:'2rem'}}>${product.price.toFixed(2)}</div>
          <p style={{marginTop:'1rem'}}>{product.description}</p>
          <p style={{color:'#666'}}>Category: {product.category} • Stock: {product.inventory}</p>
          <p style={{color:'#666'}}>Last Updated: {new Date(product.lastUpdated).toLocaleString()}</p>
        </div>
      </div>
    </>
  )
}


