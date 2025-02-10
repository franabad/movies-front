import { Price } from '@/types/prices'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { TicketsContext } from '@/context/tickets'
import { TicketMinus, TicketPlus } from 'lucide-react'
import AnimatedButtonComponent from './AnimatedButtonComponent'
import { Movie } from '@/types/movie'
import React, { useContext } from 'react'

interface TicketsComponentProps {
  action: 'forward' | 'backward' | boolean;
  handleContinue: () => void;
  movie: Movie;
}

const TicketsComponent = ({ action, handleContinue }: TicketsComponentProps) => {
  const { prices, tickets, addTickets, removeTickets } = useContext(TicketsContext)

  return (
    <DialogContent
      center={true}
      customAnimation={action}
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
      <AnimatedButtonComponent onClick={handleContinue}>Next</AnimatedButtonComponent>
    </DialogContent>
  )
}

export default TicketsComponent
