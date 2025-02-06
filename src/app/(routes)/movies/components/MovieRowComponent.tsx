'use client'

import { Movie } from '@/app/types/movie'
import { Session } from '@/app/types/session'
import { useContext, useState } from 'react'
import ModalComponent from './ModalComponent'
import { TicketsContext } from '@/context/tickets'
import { SessionContext } from '@/context/session'
import { SeatContext } from '@/context/selectedSeats'

interface MovieRowComponentProps {
  movie: Movie
  sessions: Session[]
  lastMovieId: string | null
}

const MovieRowComponent = ({ movie, sessions, lastMovieId }: MovieRowComponentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { resetSeats } = useContext(SeatContext)

  const { setSelectedSession } = useContext(SessionContext)

  const { resetTickets, resetTotal } = useContext(TicketsContext)

  const handleModalState = () => {
    if (isModalOpen) {
      // Animación de cierre
      setIsModalOpen(false)
      setTimeout(() => setIsModalVisible(false), 300) // Duración de la animación (300ms)
    } else {
      // Abrir el modal
      setIsModalVisible(true)
      setTimeout(() => setIsModalOpen(true), 0) // Agregar un pequeño retraso para activar la animación
    }
  }

  const handleModal = (session: Session) => {
    setSelectedSession(session)
    handleModalState()
    resetTickets()
    resetSeats()
    resetTotal()
  }

  return (
    <>
      <div className={`grid grid-flow-col grid-cols-[270px_minmax(900px,_1fr)] pb-3 gap-x-12 
        ${lastMovieId === movie.id ? '' : 'border-b border-b-gray-600'}`}>
        <div className='flex flex-col items-start'>
          <img className="[mask-image:linear-gradient(black_80%,transparent)]" src={movie.coverUrl} alt='Poster de la pelicula' width={270} height={270} style={{ viewTransitionName: `poster-${movie.id}` }} />
          <h2 className='text-lg font-bold mt-2'>
            {movie.title}
          </h2>
          <p>{movie.duration} minutes</p>
        </div>
        <div>
          <ul className='flex flex-col gap-y-5'>
            {sessions.map((session: Session) => (
              <li key={session.id}>
                <button onClick={() => handleModal(session)} className='border rounded hover:bg-blue-500/50 transition-all duration-200 ease-in-out px-4 py-2'>{session.time}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isModalVisible &&
        <ModalComponent isOpen={isModalOpen} handleModal={handleModalState} movie={movie} />
      }
    </>
  )
}

export default MovieRowComponent
