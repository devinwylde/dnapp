import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xykvxiihnjvjmgcnptcx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5a3Z4aWlobmp2am1nY25wdGN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5MDQzNjYsImV4cCI6MjAzMTQ4MDM2Nn0.zN6OaTqw2327opaaMrHeqhCDtC5q67He4oaGdAod0KM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);