import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(()=>{
    if (typeof window !== 'undefined'){
      const v = localStorage.getItem('isAuthenticated')
      if (v==='true'){ setIsAuthenticated(true); setUser({ email:'admin@demo.com' }) }
    }
  },[])

  const login = (email,password)=>{
    // Accept any non-empty credentials for demo ease
    if (email && password){
      setIsAuthenticated(true); setUser({ email })
      if (typeof window!=='undefined') localStorage.setItem('isAuthenticated','true')
      return true
    }
    return false
  }

  const logout = ()=>{
    setIsAuthenticated(false); setUser(null)
    if (typeof window!=='undefined') localStorage.removeItem('isAuthenticated')
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = ()=> useContext(AuthContext)


