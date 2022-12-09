import postgres from 'https://deno.land/x/postgresjs/mod.js'

const sql = postgres(
  'postgresql://postgres:' + 
  Deno.env.get("DB_PASSWORD") + '@' + 
  Deno.env.get("DB_CONN_HOST") + 
  ':5432' + '/postgres') 

export default sql