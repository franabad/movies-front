'use client'

import { createContext, useState } from 'react'
import { Seat } from '@/app/types/seat'

interface SeatContext {
  selectedSeats: Seat[]
  setSelectedSeats: (seat: Seat[]) => void,
  resetSeats: () => void
}

export const SeatContext = createContext<SeatContext>({
  selectedSeats: [],
  setSelectedSeats: () => { },
  resetSeats: () => []
})

export const SeatProvider = ({ children }: React.PropsWithChildren) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])

  const resetSeats = () => {
    setSelectedSeats([])
  }

  return (
    <SeatContext.Provider value={{
      selectedSeats,
      setSelectedSeats,
      resetSeats
    }} >
      {children}
    </SeatContext.Provider>
  )
}
