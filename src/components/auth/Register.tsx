import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="input"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="input"
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        className="input"
        required
      />
      <button type="submit" className="btn" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Registration successful! Check your email to confirm.</p>}
    </form>
  )
}
