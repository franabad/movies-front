import { Movie } from '@/app/types/movie'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SessionContext } from '@/context/session'
import { TicketsContext } from '@/context/tickets'
import { useContext, useEffect, useState } from 'react'
import { Cinema } from './SeatSelectionComponent'

interface AsideComponentProps {
  movie: Movie
}

const AsideComponent = ({ movie }: AsideComponentProps) => {
  const { selectedSession } = useContext(SessionContext)
  const { total } = useContext(TicketsContext)
  const [cinema, setCinema] = useState<Cinema | null>(null)

  useEffect(() => {
    const fetchCinema = async () => {
      try {
        const data = await fetch(`http://localhost:3000/api/cinemas/${selectedSession?.cinemaId}`)
        const cinema = await data.json()

        setCinema(cinema)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCinema()
  }, [])

  return (
    <DialogContent
      customAnimation={true}
      aside={true}
      className='aside h-full'
      animation='animate-aside-slide-in'
    >
      <DialogHeader>
        <DialogTitle>Information</DialogTitle>
        <DialogDescription>
          Check if the information is correct before continuing with the purchase.
        </DialogDescription>
      </DialogHeader>
      <div>
        <img width={200} height={200} src={movie.coverUrl} alt='Poster de la película' className="[mask-image:linear-gradient(black_80%,transparent)]"></img>
        <div className='flex flex-col gap-y-1'>
          <p>{movie.title}</p>
          <p>Duration: {movie.duration} minutes</p>
          <p>Theatre: {cinema?.name}</p>
          <p>Date: {selectedSession?.date}</p>
          <p>Time: {selectedSession?.time}</p>
          <p>Total: {total.toFixed(2)} €</p>
        </div>
      </div>
    </DialogContent>
  )
}

export default AsideComponent
