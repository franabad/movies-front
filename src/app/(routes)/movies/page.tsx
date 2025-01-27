import SessionsListComponent from '@/app/(routes)/movies/components/SessionsListComponent'

async function fetchMovies() {
  const data = await fetch('http://localhost:3000/api/movies')
  const movies = await data.json()

  return movies
}

export default async function Home() {
  const movies = await fetchMovies()

  return (
    <div className="items-center justify-items-center max-h-screen flex flex-col">
      <SessionsListComponent movies={movies} />
    </div>

  )
}
