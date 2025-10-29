import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Payment(){
  const { cart, getCartTotal, clearCart } = useCart()
  const [card, setCard] = useState('')
  const [name, setName] = useState('')
  const [exp, setExp] = useState('')
  const [cvv, setCvv] = useState('')
  const [loading, setLoading] = useState(false)
  const pay=(e)=>{ e.preventDefault(); if(cart.length===0){ alert('Cart empty'); return } setLoading(true); setTimeout(()=>{ setLoading(false); clearCart(); alert('Payment successful!'); window.location.href='/' },1500) }
  return (
    <>
      <Head><title>Payment</title></Head>
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/cart">🛒 Cart</Link>
        </nav>
      </header>
      <div className="container payment-layout">
        <div className="payment-form-section">
          <h1>💳 Payment</h1>
          <form onSubmit={pay} className="payment-form">
            <input className="search-bar" placeholder="Cardholder Name" value={name} onChange={e=>setName(e.target.value)} required />
            <input className="search-bar" placeholder="Card Number" value={card} onChange={e=>setCard(e.target.value)} required />
            <div className="form-row">
              <input className="search-bar" placeholder="MM/YY" value={exp} onChange={e=>setExp(e.target.value)} required />
              <input className="search-bar" placeholder="CVV" value={cvv} onChange={e=>setCvv(e.target.value)} required />
            </div>
            <button className="btn-pay" disabled={loading}>{loading? 'Processing...' : `Pay $${(getCartTotal()+10).toFixed(2)}`}</button>
          </form>
        </div>
        <div className="order-summary-card">
          <h2>Order Summary</h2>
          {cart.map(i=> <div key={i.id} className="summary-row"><span>{i.name} × {i.quantity}</span><span>${(i.price*i.quantity).toFixed(2)}</span></div>)}
          <div className="summary-row"><span>Subtotal</span><span>${getCartTotal().toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>$10.00</span></div>
          <div className="summary-row total"><span>Total</span><span>${(getCartTotal()+10).toFixed(2)}</span></div>
        </div>
      </div>
    </>
  )
}


