let supabaseUrl: string;
if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
} else {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL environment variable is not set');
}

let supabaseKey: string;
if (process.env.NEXT_PUBLIC_SUPABASE_KEY) {
  supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
} else {
  throw new Error('NEXT_PUBLIC_SUPABASE_KEY environment variable is not set');
}

let supabaseAnonKey: string;
if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
} else {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable is not set');
}

export { supabaseKey, supabaseUrl, supabaseAnonKey };
