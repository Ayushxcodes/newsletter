import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

let supabase: any = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a dummy client that throws an error on use
  supabase = {
    from: () => ({
      select: () => Promise.reject(new Error("Supabase not configured")),
      insert: () => Promise.reject(new Error("Supabase not configured")),
      update: () => Promise.reject(new Error("Supabase not configured")),
      delete: () => Promise.reject(new Error("Supabase not configured")),
    }),
  };
}

export { supabase };
