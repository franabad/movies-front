'use client'

import { useAuth } from '@/context/AuthContext'
import { useFormStatus } from 'react-dom'

const LoginFormComponent = () => {
  const { isAuthenticated } = useAuth()
  const { pending } = useFormStatus()

  const handleSubmit = async (formData: FormData) => {
    const username = formData.get('username')
    const password = formData.get('password')

    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    })

    if (response.status === 200) {
      const data = await response.json()

      return data
    } else {
      console.log('Login failed')
    }
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

export default LoginFormComponent
