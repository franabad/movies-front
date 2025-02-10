'use client'

/* eslint-disable indent */
import { Session } from '@/types/session'
import MovieRowComponent from './MovieRowComponent'
import { Movie } from '@/types/movie'
import { useEffect, useState } from 'react'
import { Temporal } from 'temporal-polyfill'
import { getMovies, getSessions } from '@/services'
import { useDate } from '@/context/SelectedDate'

export default function SessionsListComponent() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { selectedDate } = useDate()

  const date = (selectedDate || Temporal.Now.plainDateISO().toString()).split('-').join('')

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const movies: Movie[] = await getMovies()
      setMovies(movies)

      const sessions: Session[] = await getSessions(date)

      setSessions(sessions)
    })()
    setIsLoading(false)
  }, [date])

  const lastMovieId = movies.length > 0 ? movies[movies.length - 1].id : null

  return (

    <section className="items-center justify-center flex flex-col gap-y-5 w-full mt-8">
      {isLoading
        ? (
          <p></p>
        )
        : sessions && sessions.length > 0
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
