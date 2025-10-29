import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import LoginModal from '../components/LoginModal'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'products.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const products = JSON.parse(fileContents)
  return { props: { products } }
}

export default function Home({ products }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { addToCart, getCartItemsCount } = useCart()
  const { isAuthenticated } = useAuth()

  const categories = ['All', ...new Set(products.map(p => p.category))]

  const filtered = products
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .filter(p => `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a,b)=> sortBy==='price-low'? a.price-b.price : sortBy==='price-high'? b.price-a.price : a.name.localeCompare(b.name))

  const handleAddToCart = (product) => {
    if (!isAuthenticated) { setShowLoginModal(true); return }
    addToCart(product)
  }

  return (
    <>
      <Head>
        <title>E-Commerce Demo - Home</title>
      </Head>
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/login">Login</Link>
          <Link href="/cart" style={{ fontWeight:'bold', color:'#ff6b6b' }}>🛒 Cart ({getCartItemsCount()})</Link>
        </nav>
      </header>

      <div className="container">
        <h1 style={{ fontSize:'3rem', color:'#fff', textShadow:'0 2px 12px rgba(0,0,0,0.25)', marginBottom:'1rem' }}>🛍️ E‑Commerce Store</h1>
        <div className="filters-section">
          <input className="search-bar" placeholder="🔍 Search products..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
          <div className="filter-controls">
            <select className="filter-select" value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)}>
              {categories.map(c=> <option key={c}>{c}</option>)}
            </select>
            <select className="filter-select" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </select>
          </div>
          <div className="results-count">Showing {filtered.length} of {products.length} products</div>
        </div>

        <div className="product-grid">
          {filtered.map(p => (
            <Link key={p.id} href={`/products/${p.slug}`}>
              <div className="card">
                <div className="product-image">{p.category === 'Electronics' ? '📱' : '🎵'}</div>
                <h3>{p.name}</h3>
                <div className="product-price">${p.price.toFixed(2)}</div>
                <p style={{color:'#666'}}>{p.category}</p>
                <p style={{color:'#666'}}>Stock: {p.inventory}</p>
                <button className="btn-add-to-cart" onClick={(e)=>{e.preventDefault(); handleAddToCart(p);}}>🛒 Add to Cart</button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <LoginModal isOpen={showLoginModal} onClose={()=>setShowLoginModal(false)} onSuccess={()=>setShowLoginModal(false)} />
    </>
  )
}


