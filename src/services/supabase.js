import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://yswzkkjhmugpttpyeoqw.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzd3pra2pobXVncHR0cHllb3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4NjM1NzcsImV4cCI6MjAzMTQzOTU3N30.16_S6fRBYwR8q6OwUr_b4cPMl7d4SHns9ZEUdWHBmko';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
