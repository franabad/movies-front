'use client'

import { createContext, useContext, useState } from 'react'

interface DateContext {
  selectedDate: string
  setSelectedDate: (date: string) => void;
}

export const DateContext = createContext<DateContext>({
  selectedDate: '',
  setSelectedDate: () => { }
})

export const DateProvider = ({ children }: React.PropsWithChildren) => {
  const [selectedDate, setSelectedDate] = useState('')

  return (
    <DateContext.Provider value={{
      selectedDate,
      setSelectedDate
    }} >
      {children}
    </DateContext.Provider>
  )
}

export const useDate = () => useContext(DateContext)
