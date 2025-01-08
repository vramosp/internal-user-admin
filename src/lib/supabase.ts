import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signInWithSSO = async (domain: string) => {
  const { data, error } = await supabase.auth.signInWithSSO({
    domain,
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });
  
  if (error) throw error;
  return data;
};