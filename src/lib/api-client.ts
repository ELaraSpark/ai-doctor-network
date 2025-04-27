import { supabase } from '@/integrations/supabase/client';

interface FunctionOptions {
  body: any;
  functionName: string;
}

interface Patient {
  id: string;
  name: string;
  email: string;
  date_of_birth: string;
}

interface AuthResponse {
  user: any | null;
  error: Error | null;
}

/**
 * A generic API client for invoking Supabase Edge Functions
 */
export const apiClient = {
  /**
   * Invoke a Supabase Edge Function
   */
  invoke: async <T>({ functionName, body }: FunctionOptions): Promise<T> => {
    console.log(`Invoking Edge Function: ${functionName}`, body);

    try {
      const { data, error } = await supabase.functions.invoke(functionName, {
        body,
      });

      if (error) {
        console.error(`Error invoking ${functionName}:`, error);
        throw error;
      }

      return data as T;
    } catch (error) {
      console.error(`Error in apiClient.invoke (${functionName}):`, error);
      throw error;
    }
  },

  /**
   * Patient-related functions
   */
  patients: {
    add: async (name: string, email: string, dateOfBirth: string): Promise<Patient[]> => {
      try {
        const { data, error } = await supabase.from('patients').insert({
          name,
          email,
          date_of_birth: dateOfBirth,
        });

        if (error) {
          console.error('Error adding patient:', error);
          throw error;
        }

        return data;
      } catch (error) {
        console.error('Error in addPatient:', error);
        throw error;
      }
    },

    getAll: async (): Promise<Patient[]> => {
      try {
        const { data, error } = await supabase.from('patients').select('*');

        if (error) {
          console.error('Error fetching patients:', error);
          throw error;
        }

        return data;
      } catch (error) {
        console.error('Error in getPatients:', error);
        throw error;
      }
    },

    getById: async (id: string): Promise<Patient> => {
      try {
        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching patient by ID:', error);
          throw error;
        }

        return data;
      } catch (error) {
        console.error('Error in getPatientById:', error);
        throw error;
      }
    },
  },

  /**
   * Appointment-related functions
   */
  appointments: {
    subscribeToNew: (callback: (newAppointment: any) => void) => {
      const channel = supabase
        .channel('appointments')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'appointments' }, (payload) => {
          callback(payload.new);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    },
  },

  /**
   * Authentication-related functions
   */
  auth: {
    register: async (email: string, password: string): Promise<AuthResponse> => {
      try {
        const { user, error } = await supabase.auth.signUp({ email, password });
        return { user, error };
      } catch (error) {
        return { user: null, error };
      }
    },

    login: async (email: string, password: string): Promise<AuthResponse> => {
      try {
        const { user, error } = await supabase.auth.signInWithPassword({ email, password });
        return { user, error };
      } catch (error) {
        return { user: null, error };
      }
    },

    logout: async (): Promise<void> => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (error) {
        console.error('Error during logout:', error);
        throw error;
      }
    },

    getCurrentUser: async (): Promise<any | null> => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        return session?.user || null;
      } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
      }
    },
  },
};

/**
 * Create a new appointment
 */
export async function createAppointment(appointment: {
  patient_id: string;
  doctor_name: string;
  appointment_date: string;
  reason: string;
}): Promise<any> {
  try {
    const { data, error } = await supabase.from('appointments').insert([appointment]);
    if (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error in createAppointment:', error);
    throw error;
  }
}

/**
 * Get the total number of patients
 */
export async function getPatientCount(): Promise<number> {
  try {
    const { count, error } = await supabase.from('patients').select('*', { count: 'exact', head: true });
    if (error) {
      console.error('Error fetching patient count:', error);
      throw error;
    }
    return count || 0;
  } catch (error) {
    console.error('Error in getPatientCount:', error);
    throw error;
  }
}

/**
 * Get the total number of today's appointments
 */
export async function getTodaysAppointmentCount(): Promise<number> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const { count, error } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .gte('appointment_date', today)
      .lte('appointment_date', today);

    if (error) {
      console.error('Error fetching today\'s appointment count:', error);
      throw error;
    }
    return count || 0;
  } catch (error) {
    console.error('Error in getTodaysAppointmentCount:', error);
    throw error;
  }
}
