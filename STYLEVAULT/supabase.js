
const SUPABASE_URL = "https://hfrymsebnxhovzvqhazz.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_c-9MhGOvLUPwwCVY9Ts9Wg_FP-ZZ3oJ";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

console.log("STYLEVAULT Supabase connected!");
