import { API_URL } from '@/config'
import { Movie } from '@/types/movie'

type LoginData = { username: string | null, password: string | null }

export const getLogin = ({ username, password }: LoginData) => {
  fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  })
    .then(response => {
      if (response.status === 200) {
        return response.json()
      }
    })
    .catch(error => {
      console.error(error)
    })
}

export const checkAuth = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/check`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      return true
    } else {
      return false
    }
  } catch {
    console.error('Error checking auth')
    return false
  }
}

// Función para obtener las películas de la API
export const getMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${API_URL}/movies`) // Cambia la URL a tu API real

    return response.json()
  } catch {
    throw new Error('Error al obtener las películas')
  }
}

export const getSessions = async (date: string) => {
  const url = new URL(`${API_URL}/sessions`)

  if (date) url.searchParams.append('date', date)

  return fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 404) {
        return []
      } else {
        throw new Error('Error fetching sessions')
      }
    })
    .catch(error => {
      console.error(error)
    })
}
