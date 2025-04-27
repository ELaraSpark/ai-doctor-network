import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PatientProfile from '@/components/patients/PatientProfile';
import { apiClient } from '@/lib/api-client';

jest.mock('@/lib/api-client');

describe('PatientProfile', () => {
  const mockGetById = apiClient.patients.getById as jest.Mock;

  it('renders a loading spinner initially', () => {
    render(<PatientProfile patientId="123" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders patient info when data is fetched successfully', async () => {
    mockGetById.mockResolvedValueOnce({
      name: 'John Doe',
      email: 'john.doe@example.com',
      date_of_birth: '1990-01-01',
    });

    render(<PatientProfile patientId="123" />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('1990-01-01')).toBeInTheDocument();
    });
  });

  it('renders an error message when fetch fails', async () => {
    mockGetById.mockRejectedValueOnce(new Error('Failed to fetch patient data'));

    render(<PatientProfile patientId="123" />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch patient data')).toBeInTheDocument();
    });
  });
});