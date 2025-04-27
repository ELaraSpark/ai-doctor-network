import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const PatientProfile = ({ patientId }: { patientId: string }) => {
  const [patient, setPatient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPatient = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', patientId)
        .single()

      if (error) setError(error.message)
      else setPatient(data)
      setLoading(false)
    }

    fetchPatient()
  }, [patientId])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Patient Profile</h1>
      <p><strong>Name:</strong> {patient.full_name}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      <p><strong>Role:</strong> {patient.role}</p>
    </div>
  )
}

export default PatientProfile
