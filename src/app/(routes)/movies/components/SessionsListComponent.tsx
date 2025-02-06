/* eslint-disable indent */
import { Session } from '@/app/types/session'
import MovieRowComponent from './MovieRowComponent'
import { Movie } from '@/app/types/movie'
import { useEffect, useState } from 'react'
import { Temporal } from 'temporal-polyfill'

interface SessionsListComponentProps {
  selectedDate: string
}

export default function SessionsListComponent({ selectedDate }: SessionsListComponentProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [sessions, setSessionsByMovie] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)

  selectedDate = (selectedDate || Temporal.Now.plainDateISO().toString()).split('-').join('')

  useEffect(() => {
    const fetchMoviesAndSessions = async () => {
      setIsLoading(true)
      try {
        const moviesData = await fetch('http://localhost:3000/api/movies')
        const movies = await moviesData.json()

        setMovies(movies)

        const sessionsData = await fetch(`http://localhost:3000/api/sessions?date=${selectedDate}`)
        const sessions: Session[] = await sessionsData.json()

        if (sessionsData.status === 404) {
          setSessionsByMovie([])
        } else {
          setSessionsByMovie(sessions)
        }
      } catch (error) {
        console.error('Error fetching movies and sessions: ', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMoviesAndSessions()
  }, [selectedDate])

  const lastMovieId = movies.length > 0 ? movies[movies.length - 1].id : null

  console.log(sessions)

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
            <p>No movies available for this date</p>
          )}
    </section>
  )
}
