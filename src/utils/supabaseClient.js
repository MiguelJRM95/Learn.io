import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://umipgrdjxbaqptqioqvz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtaXBncmRqeGJhcXB0cWlvcXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI4MjIzNzYsImV4cCI6MTk2ODM5ODM3Nn0.Tk69jPvfDz7l51ij21Y5mgPJSYR0HDc5irSh94eATBk'
);
