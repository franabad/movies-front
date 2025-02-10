import { Seat } from '@/types/seat'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SeatContext } from '@/context/selectedSeats'
import { SessionContext } from '@/context/session'
import { TicketsContext } from '@/context/tickets'
import { Armchair } from 'lucide-react'
import { useEffect, useContext, useState } from 'react'
import AnimatedButtonComponent from './AnimatedButtonComponent'

interface SeatSelectionModalProps {
  action: 'forward' | 'backward' | boolean
  handleReturn: () => void
}

type LayoutSection = {
  type: string,
  rows: number,
  columns: number,
  start_row?: number,
  aisle?: { start: number, end: number }[]
}
export type Cinema = {
  id: number,
  name: string,
  capacity: number,
  layout: LayoutSection[]
}

type ReservedSeat = {
  row: number,
  seat: number,
  status: string
}

interface CandidateSeat extends Seat {
  sectionCenterColumn: number;
}

const SeatSelectionComponent = ({ action, handleReturn }: SeatSelectionModalProps) => {
  const { tickets } = useContext(TicketsContext)
  const { selectedSession } = useContext(SessionContext)
  const { selectedSeats, setSelectedSeats } = useContext(SeatContext)

  const [cinema, setCinema] = useState<Cinema | null>(null)
  const [reservedSeats, setReservedSeats] = useState<ReservedSeat[]>([])

  const numberOfTickets = Object.values(tickets).reduce((acc, value) => acc + value, 0)

  const cinemaId = selectedSession?.cinemaId

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

    const bestSeats = getBestSeats(cinema, reservedSeats, numberOfTickets)
    setSelectedSeats(bestSeats)
  }, [cinemaId])

  useEffect(() => {
    if (cinema) {
      const bestSeats = getBestSeats(cinema, reservedSeats, numberOfTickets)
      setSelectedSeats(bestSeats)
    }
  }, [cinema, reservedSeats, numberOfTickets, setSelectedSeats])

  const getBestSeats = (cinema: Cinema | null, reservedSeats: ReservedSeat[], numberOfTickets: number): Seat[] => {
    const selectedSeats: Seat[] = []

    // Buscar candidatos disponibles en toda la sala
    const candidates: CandidateSeat[] = []

    const isAisle = (seat: number, section: LayoutSection) => {
      return section.aisle?.some(a => seat >= a.start && seat <= a.end)
    }

    const isSeatAvailable = (row: number, seat: number, reservedSeats: ReservedSeat[]): boolean => {
      return !reservedSeats.some(reserved => reserved.row === row && reserved.seat === seat)
    }

    // Primero calcular el centro de la sala
    const totalRows = cinema?.layout.reduce((acc, section) => acc + section.rows, 0) || 0
    const centralRow = Math.floor(totalRows / 2) + 1

    // Para cada sección, calculamos la columna central (teniendo en cuenta la cantidad de asientos de cada sección)
    cinema?.layout.forEach(section => {
      const sectionCenterColumn = Math.floor(section.columns / 2) + 1

      for (let row = section.start_row || 1; row < (section.start_row || 1) + section.rows; row++) {
        for (let seat = 1; seat <= section.columns; seat++) {
          if (!isAisle(seat, section) && isSeatAvailable(row, seat, reservedSeats)) {
            candidates.push({ row, seat, sectionCenterColumn })
          }
        }
      }
    })

    // Ordenar candidatos por proximidad al centro de la sala
    const sortedCandidates = candidates.sort((a, b) => {
      const distanceA = Math.abs(a.row - centralRow) + Math.abs(a.seat - ((cinema?.layout[0].columns || 0) / 2 + 1))
      const distanceB = Math.abs(b.row - centralRow) + Math.abs(b.seat - ((cinema?.layout[0].columns || 0) / 2 + 1))
      return distanceA - distanceB
    })

    // Selección de asientos
    for (const candidate of sortedCandidates) {
      if (selectedSeats.length >= numberOfTickets) break

      // Verificar si podemos seleccionar más asientos en la misma fila
      const seatsInRow: CandidateSeat[] = [candidate]
      let leftSeat = candidate.seat - 1
      let rightSeat = candidate.seat + 1

      while (seatsInRow.length < numberOfTickets) {
        // Primero intentamos hacia la izquierda
        if (leftSeat > 0 && isSeatAvailable(candidate.row, leftSeat, reservedSeats)) {
          seatsInRow.unshift({ row: candidate.row, seat: leftSeat, sectionCenterColumn: candidate.sectionCenterColumn })
          leftSeat -= 1
        } else if (rightSeat <= (cinema?.layout[0].columns || 0) && isSeatAvailable(candidate.row, rightSeat, reservedSeats)) {
          seatsInRow.push({ row: candidate.row, seat: rightSeat, sectionCenterColumn: candidate.sectionCenterColumn })
          rightSeat += 1
        } else {
          break
        }
      }

      // Si encontramos suficientes asientos contiguos, seleccionarlos
      if (seatsInRow.length >= numberOfTickets) {
        selectedSeats.push(...seatsInRow.slice(0, numberOfTickets))
        break
      }
    }

    return selectedSeats
  }

  const getSeatStatus = (row: number, seat: number) => {
    const reserved = reservedSeats.some(
      reserved => reserved.row === row && reserved.seat === seat && reserved.status === 'reserved'
    )

    const blocked = reservedSeats.some(
      reserved => reserved.row === row && reserved.seat === seat && reserved.status === 'blocked'
    )

    if (reserved) return 'reserved'
    if (blocked) return 'blocked'
    return 'available'
  }

  const isSelected = (row: number, seat: number) => {
    return selectedSeats.some(selected => selected.row === row && selected.seat === seat)
  }

  const handleSeat = (row: number, seat: number) => {
    const seatStatus = getSeatStatus(row, seat)

    if (seatStatus === 'available') {
      const newSeats = [...selectedSeats] // Copia el estado actual
      if (isSelected(row, seat)) {
        setSelectedSeats(newSeats.filter(
          selected => selected.row !== row || selected.seat !== seat
        ))
      } else if (numberOfTickets > selectedSeats.length) {
        setSelectedSeats([...newSeats, { row, seat }])
      }
    }
  }

  const renderLayout = (section: LayoutSection) => {
    const rows = Array.from({ length: section.rows }, (_, i) => i + (section.start_row || 1))

    return rows.map(row => (
      <div key={row} className="flex justify-between w-full">
        {/* Número de fila a la izquierda (fuera del contenedor de asientos) */}
        <span className="absolute left-3 text-white translate-y-[6px] w-6 text-center">{row}</span>

        <div className="flex">
          {/* Iteramos sobre las columnas para renderizar los asientos */}
          {Array.from({ length: section.columns }, (_, index) => {
            const seat = index + 1

            // Verificamos si el asiento actual está en una zona de pasillo
            const isAisle = section.aisle?.some(a => seat >= a.start && seat <= a.end)

            if (isAisle) {
              return <div key={`aisle-${index}`} className="w-10 h-10" />
            }

            // Calcular el índice visible del asiento (ignorando los pasillos)
            const visibleSeatIndex = seat - (section.aisle?.reduce((count, aisle) => {
              if (seat >= aisle.start) {
                return count + Math.min(seat - aisle.start + 1, aisle.end - aisle.start + 1)
              }
              return count
            }, 0) || 0)

            const status = getSeatStatus(row, visibleSeatIndex)

            const selectedSeat = isSelected(row, visibleSeatIndex)

            const fill = selectedSeat
              ? 'green'
              : status === 'available'
                ? '#f2f2f2'
                : status === 'reserved'
                  ? 'red'
                  : '#201e1c'

            return (
              <Armchair
                key={visibleSeatIndex}
                className={`w-10 h-10 
                  ${status !== 'available' ? 'pointer-events-none' : 'cursor-pointer'}
                  ${(selectedSeats.length === numberOfTickets) && !selectedSeat ? 'pointer-events-none' : 'cursor-pointer'}
                    
                `}
                fill={fill}
                strokeWidth={0}
                onClick={() => handleSeat(row, visibleSeatIndex)}
              />
            )
          })}
        </div>

        {/* Número de fila a la derecha (fuera del contenedor de asientos) */}
        <span className="absolute right-3 translate-y-[6px] text-white w-6 text-center">{row}</span>
      </div>
    ))
  }

  return (
    <DialogContent
      center={true}
      customAnimation={true}
      animation={
        action === 'backward'
          ? 'animate-slide-out-to-left'
          : 'animate-slide-in-from-left'
      }
      className="text-white w-auto h-auto select-none flex flex-col justify-around items-center rounded-lg shadow-lg"
    >
      <DialogHeader>
        <DialogTitle>Select your seats</DialogTitle>
        <DialogDescription /> {/* Empty component to avoid warning */}
      </DialogHeader>
      <section className="relative flex flex-col mt-5 px-12 py-4 items-center justify-center">
        <div className="absolute -top-4 h-4 w-full bg-white/70 rounded-t-full flex items-center justify-center">
          <p className='font-montserrat tracking-[0.5em] font-semibold text-sm z-50 text-black'>PANTALLA</p>
        </div>
        {cinema?.layout.map((section, index) => (
          <div key={index}>
            {renderLayout(section)}
          </div>
        ))}
      </section>
      <AnimatedButtonComponent onClick={handleReturn}>Confirm</AnimatedButtonComponent>
    </DialogContent>
  )
}

export default SeatSelectionComponent
