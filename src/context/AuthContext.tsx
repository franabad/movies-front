'use client'

import { checkAuth } from '@/services'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextProps {
  isAuthenticated: boolean,
  setIsAuthenticated: (value: boolean) => void
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => { }
})

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      const authStatus = await checkAuth()
      setIsAuthenticated(authStatus)
    })()
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
