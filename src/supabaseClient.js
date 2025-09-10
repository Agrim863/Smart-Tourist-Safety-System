import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://cxpjlplqinqewuemxmmq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4cGpscGxxaW5xZXd1ZW14bW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTY0NTQsImV4cCI6MjA3MzA5MjQ1NH0.ju5ACNla7R1TRJ-PjlZ4ceB3BhG9xPusdaZnRwhQcYU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
