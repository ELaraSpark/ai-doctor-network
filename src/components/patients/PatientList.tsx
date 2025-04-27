import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const PatientList = ({ doctorId }: { doctorId: string }) => {
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'patient')
        .eq('doctor_id', doctorId)

      if (error) setError(error.message)
      else setPatients(data)
      setLoading(false)
    }

    fetchPatients()
  }, [doctorId])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Patient List</h1>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>{patient.full_name} - {patient.email}</li>
        ))}
      </ul>
    </div>
  )
}

export default PatientList
