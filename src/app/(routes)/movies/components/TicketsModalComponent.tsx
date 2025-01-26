'use client'

import { Price } from '@/app/types/prices'
import React, { useContext, useState } from 'react'
import { TicketPlus, TicketMinus } from 'lucide-react'
import { Movie } from '@/app/types/movie'
import AnimatedButtonComponent from './AnimatedButtonComponent'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle } from '@/components/ui/dialog'
import SeatSelectionModalComponent from './SeatSelectionModalComponent'
import { TicketsContext } from '@/context/tickets'
import { SeatContext } from '@/context/selectedSeats'

interface TicketsModalProps {
  isOpen: boolean;
  handleModal: () => void;
  movie: Movie;
}

const TicketsModalComponent = ({ isOpen, handleModal, movie }: TicketsModalProps) => {
  const { prices, tickets, addTickets, removeTickets } = useContext(TicketsContext)
  const [isSeatSelectionOpen, setIsSeatSelectionOpen] = useState(false)

  const { resetSeats } = useContext(SeatContext)

  const [action, setAction] = useState<'forward' | 'backward' | boolean>(false)

  const handleReturn = () => {
    setAction('backward')
    setTimeout(() => {
      setIsSeatSelectionOpen(!isSeatSelectionOpen)
    }, 500)
    resetSeats()
  }

  const handleContinue = () => {
    setAction('forward')
    setTimeout(() => {
      setIsSeatSelectionOpen(!isSeatSelectionOpen)
    }, 500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleModal}>
      <DialogOverlay />
      {/* Primer modal */}
      {!isSeatSelectionOpen && (
        <DialogContent
          customCloseAnimation={action}
          animation={
            action === 'forward'
              ? 'animate-slide-out-to-right'
              : 'animate-slide-in-from-right'}
          className="pr-8 py-8 flex flex-col gap-y-5 w-[650px] select-none justify-center items-center border rounded-[32px]"
        >
          <DialogHeader>
            <DialogTitle className='font-normal tracking-[0.2em] mb-5'>Select your tickets</DialogTitle>
            <DialogDescription /> {/* Empty component to avoid warning */}
          </DialogHeader>
          <div className="grid grid-cols-[1fr_1fr_1fr] grid-rows-[auto_repeat(4,_1fr)] gap-x-[29px] gap-y-[41px] w-full justify-end">
            <div></div>
            <div className="col-span-1 text-center font-light opacity-50 border-b-[1px] pb-2 border-gray-400/30">
              Precio
            </div>
            <div className="col-span-1 text-center font-light opacity-50 border-b-[1px] pb-2 border-gray-400/30">
              Cantidad
            </div>
            {prices.map((price: Price) => (
              <React.Fragment key={price.id}>
                <div className="flex flex-row items-center justify-around px-4 py-2">
                  <p className="text-lg font-normal text-center capitalize w-1/2">{price.priceType}</p>
                </div>
                <div className="flex flex-row items-center justify-center px-4 py-2">
                  <p className="text-lg text-center w-1/2">{price.value}</p>
                </div>
                <div className="relative flex flex-row items-center justify-center">
                  <TicketMinus
                    onClick={() => removeTickets(price.id)}
                    size={32}
                    className={`${tickets[price.id] === 0 || tickets[price.id] === undefined
                      ? 'cursor-auto opacity-50'
                      : 'cursor-pointer'
                      } 
                      absolute left-1
                    `}
                  />
                  <p className="text-lg text-center mx-4">{tickets[price.id] || 0}</p>
                  <TicketPlus size={32} onClick={() => addTickets(price.id)} className="cursor-pointer absolute right-1" />
                </div>
              </React.Fragment>
            ))}
          </div>
          <img src={movie.coverUrl} alt="Poster de la película" width={500} height={500} className="absolute transform translate-x-[160%] [mask-image:linear-gradient(black_80%,transparent)] rounded" />
          <AnimatedButtonComponent onClick={handleContinue}>Next</AnimatedButtonComponent>
        </DialogContent>
      )}

      {/* Segundo modal */}
      {isSeatSelectionOpen && (
        <SeatSelectionModalComponent
          action={action}
          handleReturn={handleReturn} />
      )}
    </Dialog >
  )
}

export default TicketsModalComponent
