import { Session } from '@/app/types/session'
import MovieRowComponent from './MovieRowComponent'
import { Movie } from '@/app/types/movie'

interface SessionsListComponentProps {
  movies: Movie[]
}

export default function SessionsListComponent({ movies }: SessionsListComponentProps) {
  const fetchSessions = async (movie: Movie) => {
    const data = await fetch(`http://localhost:3000/api/sessions/movie/${movie.id}`)
    const sessions: Session[] = await data.json()

    return sessions
  }

  const lastMovieId = movies[movies.length - 1].id

  return (
    <section className="items-center justify-center flex flex-col gap-y-5 w-full mt-8">
      {movies.map(async (movie: Movie) => {
        const sessions = await fetchSessions(movie)
        return (
          <MovieRowComponent key={movie.id} movie={movie} sessions={sessions} lastMovieId={lastMovieId} />
        )
      })}
    </section>
  )
}
