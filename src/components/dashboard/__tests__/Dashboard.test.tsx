import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '@/components/dashboard/Dashboard';
import { apiClient } from '@/lib/api-client';

jest.mock('@/lib/api-client');

describe('Dashboard', () => {
  const mockGetPatientCount = apiClient.getPatientCount as jest.Mock;
  const mockGetTodaysAppointmentCount = apiClient.getTodaysAppointmentCount as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<Dashboard />);
    expect(screen.getByText('Loading dashboard...')).toBeInTheDocument();
  });

  it('renders metrics correctly when data is fetched successfully', async () => {
    mockGetPatientCount.mockResolvedValueOnce(10);
    mockGetTodaysAppointmentCount.mockResolvedValueOnce(5);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Total Patients')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('Appointments Today')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  it('renders an error message when fetching metrics fails', async () => {
    mockGetPatientCount.mockRejectedValueOnce(new Error('Failed to fetch patient count'));
    mockGetTodaysAppointmentCount.mockRejectedValueOnce(new Error('Failed to fetch appointment count'));

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load dashboard metrics.')).toBeInTheDocument();
    });
  });
});