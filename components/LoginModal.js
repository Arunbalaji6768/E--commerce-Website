import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginModal({ isOpen, onClose, onSuccess }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  if (!isOpen) return null
  const submit=(e)=>{ e.preventDefault(); setError(''); if (email && password && login(email,password)){ onSuccess(); onClose(); } else setError('Please enter email and password') }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>🔐 Login Required</h2>
        <p>Please login to add items to cart</p>
        {error && <div className="alert">{error}</div>}
        <form onSubmit={submit}>
          <div className="form-group"><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@demo.com" required /></div>
          <div className="form-group"><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="admin123" required /></div>
          <button className="btn-add-to-cart" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}


