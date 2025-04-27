import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const AppointmentForm = () => {
  const [doctorId, setDoctorId] = useState('')
  const [patientId, setPatientId] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [status, setStatus] = useState('pending')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    const { error } = await supabase.from('appointments').insert([
      { doctor_id: doctorId, patient_id: patientId, scheduled_at: scheduledAt, status }
    ])

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Doctor ID" value={doctorId} onChange={e => setDoctorId(e.target.value)} className="input" />
      <input type="text" placeholder="Patient ID" value={patientId} onChange={e => setPatientId(e.target.value)} className="input" />
      <input type="datetime-local" value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} className="input" />
      <button type="submit" className="btn">Create Appointment</button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Appointment created successfully!</p>}
    </form>
  )
}

export default AppointmentForm
