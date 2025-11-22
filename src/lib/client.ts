import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const createClient = () => {
  return createSupabaseClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
  )
}

export default createClient;