import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lmnwepygaqlwhyuysjdt.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtbndlcHlnYXFsd2h5dXlzamR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NDc3MTYsImV4cCI6MjA4NTMyMzcxNn0.LQqcI59ulk-hpElOiGdvBZX9zbNZn32bDG6jfeB6BdQ';

if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'development') {
        console.warn('Supabase URL or Anon Key is missing. Check your .env file.');
    }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
