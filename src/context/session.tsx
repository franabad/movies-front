'use client'

import { Session } from '@/types/session'
import { createContext, useState } from 'react'

interface SessionContext {
  selectedSession: Session | null
  setSelectedSession: (session: Session) => void
}

export const SessionContext = createContext<SessionContext>({
  selectedSession: null as Session | null,
  setSelectedSession: () => { }
})

export const SessionProvider = ({ children }: React.PropsWithChildren) => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)

  return (
    <SessionContext.Provider value={{
      selectedSession,
      setSelectedSession
    }} >
      {children}
    </SessionContext.Provider>
  )
}
