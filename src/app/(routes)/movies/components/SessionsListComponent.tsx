'use client'

/* eslint-disable indent */
import { Session } from '@/types/session'
import MovieRowComponent from './MovieRowComponent'
import { Movie } from '@/types/movie'
import { useDate } from '@/context/SelectedDate'
import useSWR from 'swr'
import { Temporal } from 'temporal-polyfill'
import { NEXT_PUBLIC_API_URL as API_URL } from '@/config'
// import { getSessions } from '@/services'

export const SessionsListComponent = ({ movies }: { movies: Movie[] }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const { selectedDate } = useDate()

  const date = (selectedDate || Temporal.Now.plainDateISO().toString()).split('-').join('')

  const { data: sessions, error } = useSWR<Session[]>(date ? `${API_URL}/sessions?date=${date}` : null, fetcher, {
    revalidateOnFocus: false, // No revalidar al enfocar la ventana
    revalidateOnReconnect: false, // No revalidar al reconectar la red
    dedupingInterval: 10000 // Aumenta el intervalo de deduplicación (por defecto es 2000ms)
  })

  if (error) return <p>Error al obtener las sesiones</p>
  if (!sessions) return <p>Loading sessions...</p>

  const lastMovieId = movies.length > 0 ? movies[movies.length - 1].id : null

  return (

    <section className="items-center justify-center flex flex-col gap-y-5 w-full mt-8">
      {sessions && sessions.length > 0
        ? (
          movies
            .filter((movie: Movie) => sessions.some((session: Session) => session.movieId === movie.id))
            .map((movie: Movie) => (
              <MovieRowComponent key={movie.id} movie={movie} sessions={sessions.filter((session: Session) => session.movieId === movie.id)} lastMovieId={lastMovieId} />
            ))
        )
        : (
          <p>No session found for this date</p>
        )}
    </section>
  )
}
