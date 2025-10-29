import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }){
  const [cart, setCart] = useState([])

  useEffect(()=>{
    if (typeof window !== 'undefined'){
      const saved = localStorage.getItem('cart')
      if (saved) setCart(JSON.parse(saved))
    }
  },[])

  useEffect(()=>{
    if (typeof window !== 'undefined') localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])

  const addToCart = (product)=>{
    const found = cart.find(i=>i.id===product.id)
    if (found) setCart(cart.map(i=> i.id===product.id ? { ...i, quantity: i.quantity+1 } : i ))
    else setCart([...cart, { ...product, quantity: 1 }])
  }
  const removeFromCart = (id)=> setCart(cart.filter(i=>i.id!==id))
  const updateQuantity = (id, q)=> setCart(q<=0? cart.filter(i=>i.id!==id) : cart.map(i=> i.id===id?{...i, quantity:q}:i))
  const clearCart = ()=> setCart([])
  const getCartTotal = ()=> cart.reduce((t,i)=>t+i.price*i.quantity,0)
  const getCartItemsCount = ()=> cart.reduce((t,i)=>t+i.quantity,0)

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemsCount }}>{children}</CartContext.Provider>
}

export const useCart = ()=> useContext(CartContext)


