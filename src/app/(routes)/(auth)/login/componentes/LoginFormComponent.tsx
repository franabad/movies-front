'use client'

import { useAuth } from '@/context/AuthContext'
import { getLogin } from '@/services'

import { useFormStatus } from 'react-dom'

export const LoginFormComponent = () => {
  const { isAuthenticated } = useAuth()
  const { pending } = useFormStatus()

  const handleSubmit = (formData: FormData) => {
    const username = formData.get('username') as string | null
    const password = formData.get('password') as string | null

    getLogin({ username, password })
  }

  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" className='text-black' />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" className='text-black' />
      </div>
      <button type="submit" disabled={pending}>
        {pending ? 'Loading...' : 'Login'}
      </button>
      {isAuthenticated && <p>User authenticated</p>}
    </form>
  )
}
