/* eslint-disable @typescript-eslint/no-unused-vars */
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SessionContext } from '@/context/session'
import { TicketsContext } from '@/context/tickets'
import { Armchair } from 'lucide-react'
import { useEffect, useContext, useState } from 'react'

interface SeatSelectionModalProps {
  action: 'forward' | 'backward' | boolean
  handleReturn: () => void
}

type Cinema = {
  id: number,
  name: string,
  capacity: number
}

type ReservedSeat = {
  row: number,
  seat: number,
  status: string
}

const SeatSelectionModalComponent = ({ action, handleReturn }: SeatSelectionModalProps) => {
  const { tickets } = useContext(TicketsContext)
  const { selectedSession } = useContext(SessionContext)
  const [cinema, setCinema] = useState<Cinema | null>(null)
  const [reservedSeats, setReservedSeats] = useState<ReservedSeat[]>([])

  const numberOfTickets = Object.values(tickets).reduce((acc, value) => acc + value, 0)

  const cinemaId = selectedSession?.cinemaId

  const capacity = Array.from({ length: cinema?.capacity || 0 }, (_, index) => index)

  useEffect(() => {
    const fetchCinema = async () => {
      try {
        const data = await fetch(`http://localhost:3000/api/cinemas/${cinemaId}`)
        const cinema = await data.json()

        setCinema(cinema)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCinema()

    const fetchReservedSeats = async () => {
      try {
        const data = await fetch(`http://localhost:3000/api/reserved-seats/session/${selectedSession?.id}`)
        const reservedSeats = await data.json()

        setReservedSeats(reservedSeats)
      } catch (error) {
        console.error(error)
      }
    }

    fetchReservedSeats()
  }, [cinemaId])

  const isSeatReserved = (row: number, seat: number) => {
    return reservedSeats.some(
      reserved => reserved.row === row && reserved.seat === seat && reserved.status !== 'available'
    )
  }

  return (
    <DialogContent
      center={true}
      customCloseAnimation={true}
      animation={
        action === 'backward'
          ? 'animate-slide-out-to-left'
          : 'animate-slide-in-from-left'
      }
      className="bg-[#050515] text-white w-[900px] h-[650px] flex flex-col justify-around items-center rounded-lg shadow-lg z-50"
    >
      <DialogHeader>
        <DialogTitle>Selecciona tus asientos</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-12 px-4 py-2 bg-zinc-950/40">
        {capacity.map((index) => {
          const row = Math.floor(index / 12) + 2
          const seat = (index % 12) + 1

          return (
            <button
              key={index}
              className="text-black rounded-lg flex justify-center items-center"
            >
              <Armchair fill={`${isSeatReserved(row, seat) ? 'red' : '#fff'}`} strokeWidth='0' size={50} />
            </button>
          )
        })}
      </div>
      <button className="text-white" onClick={handleReturn}>Atrás</button>
    </DialogContent>
  )
}

export default SeatSelectionModalComponent
