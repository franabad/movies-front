import React, { useContext, useState } from 'react'
import { Movie } from '@/types/movie'
import { Dialog, DialogOverlay } from '@/components/ui/dialog'
import { SeatContext } from '@/context/selectedSeats'
import TicketsComponent from './TicketsComponent'
import SeatSelectionComponent from './SeatSelectionComponent'
import AsideComponent from './AsideComponent'
import { TicketsProvider } from '@/context/tickets'

interface TicketsModalProps {
  isOpen: boolean;
  handleModal: () => void;
  movie: Movie;
}

const ModalComponent = ({ isOpen, handleModal, movie }: TicketsModalProps) => {
  const [isSeatSelectionOpen, setIsSeatSelectionOpen] = useState(false)

  const [action, setAction] = useState<'forward' | 'backward' | boolean>(false)

  const { resetSeats } = useContext(SeatContext)

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
    <TicketsProvider>
      <Dialog open={isOpen} onOpenChange={handleModal}>
        <AsideComponent movie={movie} />
        <DialogOverlay />

        {/* Primer modal */}
        {!isSeatSelectionOpen && (
          <TicketsComponent
            action={action}
            handleContinue={handleContinue}
            movie={movie} />
        )}

        {/* Segundo modal */}
        {isSeatSelectionOpen && (
          <SeatSelectionComponent
            action={action}
            handleReturn={handleReturn} />
        )}
      </Dialog >
    </TicketsProvider>
  )
}

export default ModalComponent
