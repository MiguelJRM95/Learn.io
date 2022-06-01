import { withPageAuth, getUser } from '@supabase/supabase-auth-helpers/nextjs';
import { createClient } from '@supabase/supabase-auth-helpers/node_modules/@supabase/supabase-js';
import { supabaseKey, supabaseUrl } from '../../utils/envVars';

const supabase = createClient(supabaseUrl, supabaseKey);
export { supabase, withPageAuth, getUser };
