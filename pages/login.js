import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Login(){
  const { login } = useAuth()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [msg,setMsg]=useState('')
  const submit=(e)=>{ e.preventDefault(); setMsg(email && password && login(email,password)?'✅ Logged in':'❌ Enter email and password') }
  return (
    <>
      <Head><title>Login</title></Head>
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>
      <div className="container">
        <h1>Login</h1>
        <p style={{color:'#666', margin:'0.5rem 0 1rem'}}>Demo: use any email and password</p>
        {msg && <div className="alert">{msg}</div>}
        <form onSubmit={submit} className="card">
          <input className="search-bar" value={email} placeholder="Email" onChange={e=>setEmail(e.target.value)} />
          <input className="search-bar" type="password" value={password} placeholder="Password" onChange={e=>setPassword(e.target.value)} />
          <button className="btn-add-to-cart">Login</button>
        </form>
      </div>
    </>
  )
}


