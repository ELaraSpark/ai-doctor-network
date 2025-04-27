import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppointmentForm from '@/components/appointments/AppointmentForm';
import { apiClient } from '@/lib/api-client';
import { toast } from '@/hooks/use-toast';

jest.mock('@/lib/api-client');
jest.mock('@/hooks/use-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('AppointmentForm', () => {
  const mockCreateAppointment = apiClient.createAppointment as jest.Mock;

  it('renders the form fields', () => {
    render(<AppointmentForm patientId="123" />);

    expect(screen.getByLabelText('Doctor Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Appointment Date/Time')).toBeInTheDocument();
    expect(screen.getByLabelText('Reason')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /book appointment/i })).toBeInTheDocument();
  });

  it('shows a success toast on successful submission', async () => {
    mockCreateAppointment.mockResolvedValueOnce({});

    render(<AppointmentForm patientId="123" />);

    fireEvent.change(screen.getByLabelText('Doctor Name'), { target: { value: 'Dr. Smith' } });
    fireEvent.change(screen.getByLabelText('Appointment Date/Time'), { target: { value: '2025-04-25T10:00' } });
    fireEvent.change(screen.getByLabelText('Reason'), { target: { value: 'Routine check-up' } });
    fireEvent.click(screen.getByRole('button', { name: /book appointment/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Appointment created successfully!');
    });
  });

  it('shows an error toast on failed submission', async () => {
    mockCreateAppointment.mockRejectedValueOnce(new Error('Failed to create appointment'));

    render(<AppointmentForm patientId="123" />);

    fireEvent.change(screen.getByLabelText('Doctor Name'), { target: { value: 'Dr. Smith' } });
    fireEvent.change(screen.getByLabelText('Appointment Date/Time'), { target: { value: '2025-04-25T10:00' } });
    fireEvent.change(screen.getByLabelText('Reason'), { target: { value: 'Routine check-up' } });
    fireEvent.click(screen.getByRole('button', { name: /book appointment/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to create appointment. Please try again.');
    });
  });
});