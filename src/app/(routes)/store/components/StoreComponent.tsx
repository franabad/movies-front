'use client'

// import { SessionContext } from '@/context/session'
import { TicketsContext } from '@/context/tickets'
import { useContext } from 'react'

const StoreComponent = () => {
  const { total } = useContext(TicketsContext)

  // const { selectedSession } = useContext(SessionContext)

  return (
    <div className="font-opensans items-center justify-items-center max-h-screen flex flex-col">
      <p>{total}</p>
    </div>
  )
}

export default StoreComponent
