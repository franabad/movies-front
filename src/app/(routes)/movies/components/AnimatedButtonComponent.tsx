import React, { useContext } from 'react'
import { ChevronRight } from 'lucide-react'
import { TicketsContext } from '@/context/tickets'

interface AnimatedButtonProps {
  onClick: () => void
}

const AnimatedButtonComponent = ({ onClick }: AnimatedButtonProps) => {
  const { tickets } = useContext(TicketsContext)

  return (
    <button
      className={`group gap-x-2 flex flex-row items-center justify-center rounded-xl bg-[#11117b] px-6 py-3 overflow-hidden transition-all duration-300 ease-out hover:bg-[#1a1a8f] hover:shadow-lg ${Object.values(tickets).every((value) => value === 0) ? 'pointer-events-none opacity-50' : ''}`}
      onClick={onClick}
    >
      <span>
        Continuar
      </span>
      <ChevronRight
        size={22}
        className="relative z-10 group-hover:animate-arrow-slide"
        strokeWidth={1.5}
      />
    </button>
  )
}

export default AnimatedButtonComponent
