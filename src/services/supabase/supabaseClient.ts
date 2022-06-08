import { withPageAuth, getUser, supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';

const supabase = supabaseClient;
export { supabase, withPageAuth, getUser };
