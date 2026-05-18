import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

// Validate if the Supabase URL is properly formatted and not a placeholder
const isValidUrl = (url) => {
  try {
    if (!url) return false;
    new URL(url);
    return !url.includes("your-project-id");
  } catch (e) {
    return false;
  }
};

// Validate if the Supabase Anon Key is not a placeholder
const isValidKey = (key) => {
  return key && key !== "your-supabase-anon-key-here" && key.trim().length > 0;
};

if (isValidUrl(supabaseUrl) && isValidKey(supabaseAnonKey)) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn(
      "Failed to initialize Supabase client. Local fallback data will be used.",
      error
    );
  }
} else {
  console.warn(
    "Supabase credentials are not configured or are still using placeholders. Local fallback data will be used."
  );
}

export { supabase };
