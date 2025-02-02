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
      <DialogHeader className='mb-5'>
        <DialogTitle>Information</DialogTitle>
        <DialogDescription>
          Check if the information is correct before continuing with the purchase.
        </DialogDescription>
      </DialogHeader>
      <div className='flex flex-col justify-between h-[75%]'>
        <div className='flex flex-col text-sm'>
          <img width={200} height={200} src={movie.coverUrl} alt='Poster de la película' className="[mask-image:linear-gradient(black_80%,transparent)]"></img>
          <h1 className='text-base font-montserrat mb-2'>{movie.title}</h1>
          <p>Duration: {movie.duration} minutes</p>
          <p>Theatre: {cinema?.name}</p>
          <p>Date: {selectedSession?.date}</p>
          <p>Time: {selectedSession?.time}</p>
        </div>
        <p className='font-bold text-2xl font-montserrat'>Total: {total.toFixed(2)} €</p>
      </div>
    </DialogContent>
  )
}

export default AsideComponent
