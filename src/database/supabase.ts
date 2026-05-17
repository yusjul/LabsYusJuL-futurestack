import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'implicit',
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export async function signInWithUsername(username: string, password: string) {
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('email')
    .eq('username', username)
    .single();

  if (profileError || !profile) {
    throw new Error('Username not found');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: profile.email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUpWithProfile(username: string, email: string, gender: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  if (!data.user) throw new Error('Failed to create user account. Please try again.');

  const { error: profileError } = await supabase.from('profiles').insert({
    id: data.user.id,
    username,
    email,
    gender,
  });
  if (profileError) throw profileError;

  return data;
}

export async function resetPasswordForEmail(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
