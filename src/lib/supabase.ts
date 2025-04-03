
import { createClient } from '@supabase/supabase-js';

// For development without environment variables, you can use default values
// In production, replace these with your actual Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project-id.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Check if we have minimal requirements to initialize the client
if (supabaseUrl === 'https://your-supabase-project-id.supabase.co' || 
    supabaseAnonKey === 'your-supabase-anon-key') {
  console.warn('Using default Supabase credentials. Please set your environment variables for production use.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export a simple function to check if real credentials are being used
export const hasRealSupabaseCredentials = () => {
  return supabaseUrl !== 'https://your-supabase-project-id.supabase.co' && 
         supabaseAnonKey !== 'your-supabase-anon-key';
};
