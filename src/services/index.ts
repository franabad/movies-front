import { NEXT_PUBLIC_API_URL as API_URL } from '@/config'
import { Movie } from '@/types/movie'
import { Session } from '@/types/session'

type LoginData = { username: string | null, password: string | null }

export const getLogin = async ({ username, password }: LoginData) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
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

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${API_URL}/movies`) // Cambia la URL a tu API real

    return response.json()
  } catch {
    throw new Error('Error al obtener las películas')
  }
}

export const getSessions = async (date: string): Promise<Session[]> => {
  if (!API_URL) throw new Error('API_URL is not defined')

  try {
    const url = new URL(`${API_URL}/sessions`)

    if (date) url.searchParams.append('date', date)

    const response = await fetch(url)

    if (response.status === 200) {
      return response.json()
    } else if (response.status === 404) {
      return []
    } else {
      throw new Error('Error fetching sessions')
    }
  } catch {
    throw new Error('Error fetching sessions')
  }
}
