import { createClient } from '@supabase/supabase-js';

// 直接把值写在这里，不用环境变量
const supabaseUrl = 'https://mdpyiqeasdrrmtzzjlvr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kcHlpcWVhc2Rycm10enpqbHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMjYyMDAsImV4cCI6MjA5MTgwMjIwMH0.BCd2zLutvjV0cf8QpUmTgSqpmuf1vGktjewGhNXe3Cg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);