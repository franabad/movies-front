'use client'

import SessionsListComponent from '@/app/(routes)/movies/components/SessionsListComponent'
import DateDropdownComponent from './components/DateDropdownComponent'
import { useState } from 'react'

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>('')

  return (
    <div className="items-center justify-items-center max-h-screen flex flex-col">
      <DateDropdownComponent setSelectedDate={setSelectedDate} />
      <SessionsListComponent selectedDate={selectedDate} />
    </div>

  )
}
