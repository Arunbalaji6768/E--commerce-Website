import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function Admin() {
  const [form, setForm] = useState({ name:'', slug:'', description:'', price:'', category:'', inventory:'' })
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      console.log('Submitting product...');
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'admin-secret-key-123'
        },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          inventory: parseInt(form.inventory)
        })
      })
      
      const data = await res.json()
      console.log('API Response:', data);
      
      if (!res.ok) {
        console.error('API Error:', data)
        setMessage(`❌ Error: ${data.error || data.details || 'Failed to add product'}`)
        return
      }
      
      setMessage('✅ Product added successfully')
      setForm({ name:'', slug:'', description:'', price:'', category:'', inventory:'' })
    } catch (error) {
      console.error('Submit error:', error)
      setMessage(`❌ Error: ${error.message}`)
    }
  }

  return (
    <>
      <Head><title>Admin</title></Head>
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>
      <div className="container">
        <h1>⚙️ Admin Panel (CSR)</h1>
        {message && <div className="alert">{message}</div>}
        <form onSubmit={submit} className="card">
          <input className="search-bar" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
          <input className="search-bar" placeholder="Slug" value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})} required />
          <textarea className="search-bar" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required />
          <input className="search-bar" type="number" step="0.01" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required />
          <input className="search-bar" placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} required />
          <input className="search-bar" type="number" placeholder="Inventory" value={form.inventory} onChange={e=>setForm({...form,inventory:e.target.value})} required />
          <button className="btn-add-to-cart" type="submit">Add Product</button>
        </form>
      </div>
    </>
  )
}


