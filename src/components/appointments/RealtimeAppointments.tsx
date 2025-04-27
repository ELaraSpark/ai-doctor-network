import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const RealtimeAppointments = () => {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await supabase.from('appointments').select('*')
      if (!error) setAppointments(data)
    }

    fetchAppointments()

    const subscription = supabase
      .channel('appointments-room')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, (payload) => {
        fetchAppointments()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appt: any) => (
          <li key={appt.id}>{appt.doctor_id} with {appt.patient_id} at {appt.scheduled_at} - {appt.status}</li>
        ))}
      </ul>
    </div>
  )
}

export default RealtimeAppointments
