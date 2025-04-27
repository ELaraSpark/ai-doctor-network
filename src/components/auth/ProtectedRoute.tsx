import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) navigate('/login')
      setLoading(false)
    }
    checkSession()
  }, [])

  return loading ? <p>Loading...</p> : children
}
