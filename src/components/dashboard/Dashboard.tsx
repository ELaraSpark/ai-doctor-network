import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';

const Dashboard: React.FC = () => {
  const [patientCount, setPatientCount] = useState<number | null>(null);
  const [appointmentCount, setAppointmentCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const [patients, appointments] = await Promise.all([
          apiClient.getPatientCount(),
          apiClient.getTodaysAppointmentCount(),
        ]);
        setPatientCount(patients);
        setAppointmentCount(appointments);
      } catch (err: any) {
        setError('Failed to load dashboard metrics.');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <div className="text-center">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white shadow-md rounded-md p-4 text-center">
        <h2 className="text-lg font-bold">Total Patients</h2>
        <p className="text-2xl font-semibold">{patientCount}</p>
      </div>

      <div className="bg-white shadow-md rounded-md p-4 text-center">
        <h2 className="text-lg font-bold">Appointments Today</h2>
        <p className="text-2xl font-semibold">{appointmentCount}</p>
      </div>

      <div className="bg-white shadow-md rounded-md p-4 text-center">
        <h2 className="text-lg font-bold">Registered Doctors</h2>
        <p className="text-2xl font-semibold">Coming Soon</p>
      </div>
    </div>
  );
};

export default Dashboard;