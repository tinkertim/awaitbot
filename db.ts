import postgres from "https://deno.land/x/postgresjs@v3.3.2/mod.js"

const sql = postgres(
  'postgresql://postgres:' + 
  Deno.env.get("DB_PASSWORD") + '@' + 
  Deno.env.get("DB_CONN_HOST") + 
  ':5432' + '/postgres') 

export default sql