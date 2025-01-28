import React, { useContext } from 'react'
import { ChevronRight } from 'lucide-react'
import { TicketsContext } from '@/context/tickets'
import { SeatContext } from '@/context/selectedSeats'

interface AnimatedButtonProps {
  onClick: () => void,
  children: React.ReactNode
}

const AnimatedButtonComponent = ({ onClick, children }: AnimatedButtonProps) => {
  const { tickets } = useContext(TicketsContext)
  const { selectedSeats } = useContext(SeatContext)

  return (
    <button
      className={
        `group gap-x-2 flex flex-row items-center justify-center rounded-xl bg-[#11117b] px-6 py-3 overflow-hidden transition-all duration-300 ease-out hover:bg-[#1a1a8f] hover:shadow-lg 
        ${Object.values(tickets).every((value) => value === 0) ? 'pointer-events-none opacity-50' : ''}
        ${selectedSeats.length === 0 && children === 'Confirm' ? 'pointer-events-none opacity-50' : ''}
      `}
      onClick={onClick}
    >
      <span>
        {children}
      </span>
      <ChevronRight
        size={22}
        className="relative group-hover:animate-arrow-slide"
        strokeWidth={1.5}
      />
    </button>
  )
}

export default AnimatedButtonComponent
