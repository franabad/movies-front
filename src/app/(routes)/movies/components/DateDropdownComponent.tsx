'use client'

import { useEffect, useRef, useState } from 'react'
import { Temporal } from 'temporal-polyfill'

const DateDropdownComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const generateDates = () => {
    const dates = []

    const today = Temporal.Now.plainDateISO()

    for (let i = 0; i <= 7; i++) {
      const date = today.add({ days: i })
      dates.push(date.toString())
    }
    return dates
  }

  const dates = generateDates()

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleOptionClick = (option: string) => {
    setDate(option)
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative w-32" ref={dropdownRef}>
      <label htmlFor="dateDropdown" className="block mb-2 text-sm font-medium">Select a date: </label>
      <div
        onClick={toggleDropdown}
        className="cursor-pointer bg-gray-700/50 w-full rounded-md px-2 py-1 shadow-md"
      >
        {date || 'Select a date'}
      </div>
      {isOpen && (
        <ul className="cursor-pointer absolute w-full mt-1 bg-black border-[1px] border-gray-300/30 px-1 flex flex-col rounded-md shadow-lg">
          {dates.map((date, index) => (
            <li
              key={date}
              onClick={() => handleOptionClick(date)}
              className={` border-gray-300/30 hover:bg-gray-200/20 px-2 py-1 rounded-md mt-1 transition-all duration-200 ease-in-out ${index === dates.length - 1 && 'mb-1'}`}
            >
              {date}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DateDropdownComponent
