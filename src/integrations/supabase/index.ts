import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL and Key must be provided in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);