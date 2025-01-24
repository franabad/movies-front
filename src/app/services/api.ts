import { Movie } from '../types/movie'

// Función para obtener las películas de la API
export const fetchMovies = async (): Promise<Movie[]> => {
  const response = await fetch('http://localhost:3000/api/movies') // Cambia la URL a tu API real
  if (!response.ok) {
    throw new Error('Error al obtener las películas')
  }
  return response.json()
}
