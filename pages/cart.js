import Link from 'next/link'
import Head from 'next/head'
import { useCart } from '../context/CartContext'

export default function Cart(){
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart()
  const checkout = ()=>{ if(cart.length===0){ alert('Cart empty'); return } window.location.href='/payment' }
  return (
    <>
      <Head><title>Cart</title></Head>
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/cart" style={{ fontWeight:'bold', color:'#ff6b6b' }}>🛒 Cart ({cart.length})</Link>
        </nav>
      </header>
      <div className="container">
        <h1>🛒 Your Cart</h1>
        {cart.length===0 ? (
          <div className="empty-cart"><div className="empty-cart-icon">🛍️</div><h2>Your cart is empty</h2><Link href="/"><button className="btn-add-to-cart">Continue Shopping</button></Link></div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item=> (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-image">{item.category==='Electronics'?'📱':'🎵'}</div>
                  <div><h3>{item.name}</h3><div style={{color:'#666'}}>{item.category}</div><div style={{fontWeight:'bold'}}>${item.price.toFixed(2)}</div></div>
                  <div className="cart-item-quantity"><button onClick={()=>updateQuantity(item.id, item.quantity-1)}>-</button><span>{item.quantity}</span><button onClick={()=>updateQuantity(item.id, item.quantity+1)}>+</button></div>
                  <div className="cart-item-total">${(item.price*item.quantity).toFixed(2)}</div>
                  <button className="cart-item-remove" onClick={()=>removeFromCart(item.id)}>Remove</button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="summary-card">
                <div className="summary-row"><span>Subtotal</span><span>${getCartTotal().toFixed(2)}</span></div>
                <div className="summary-row"><span>Shipping</span><span>$10.00</span></div>
                <div className="summary-row total"><span>Total</span><span>${(getCartTotal()+10).toFixed(2)}</span></div>
                <button className="btn-checkout" onClick={checkout}>Proceed to Payment</button>
                <button className="btn-clear-cart" onClick={clearCart}>Clear Cart</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}


