'use client'

import { Price } from '@/app/types/prices'
// import { TicketsContextType } from '@/app/types/ticketsContext'
import { createContext, useEffect, useState } from 'react'

interface TicketsContext {
  prices: Price[]
  tickets: { [priceId: number]: number }
  total: number,
  resetTotal: () => void
  addTickets: (priceId: number) => void
  removeTickets: (priceId: number) => void
  resetTickets: () => void
}

export const TicketsContext = createContext<TicketsContext>({
  prices: [],
  tickets: {},
  total: 0,
  resetTotal: () => { },
  addTickets: () => { },
  removeTickets: () => { },
  resetTickets: () => { }
})

export const TicketsProvider = ({ children }: React.PropsWithChildren) => {
  const [tickets, setTickets] = useState<{ [key: number]: number }>({})
  const [total, setTotal] = useState(0)
  const [prices, setPrices] = useState<Price[]>([])

  const initialTickets = prices.reduce((acc, price) => {
    acc[price.id] = 0
    return acc
  }, {} as { [key: number]: number })

  const resetTotal = () => {
    setTotal(0)
  }

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await fetch('http://localhost:3000/api/prices')
        const prices: Price[] = await data.json()

        setPrices(prices)

        setTickets(initialTickets)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPrices()
  }, [])

  const addTickets = (priceId: number) => {
    setTickets((tickets) => {
      const newTickets = {
        ...tickets,
        [priceId]: (tickets[priceId] || 0) + 1
      }

      setTotal(calculateTotal(newTickets))

      return newTickets
    })
  }

  const removeTickets = (priceId: number) => {
    setTickets((tickets) => {
      const newTickets = {
        ...tickets,
        [priceId]: Math.max((tickets[priceId] || 0) - 1, 0)
      }

      setTotal(calculateTotal(newTickets))

      return newTickets
    })
  }

  const calculateTotal = (newTickets: { [priceId: number]: number }): number => {
    return Object.keys(newTickets).reduce((acc, id) => {
      const price = prices.find((price) => price.id === Number(id))
      return acc + (price ? price.value * (newTickets[Number(id)] || 0) : 0)
    }, 0)
  }

  const resetTickets = () => {
    setTickets(initialTickets)
  }

  return (
    <TicketsContext.Provider value={{
      tickets,
      total,
      resetTotal,
      prices,
      addTickets,
      removeTickets,
      resetTickets
    }}
    >
      {children}
    </TicketsContext.Provider>
  )
}
