
import { createClient } from './deps.ts'
import { GatewayIntents } from './deps.ts'
import { AwaitBotClient } from './src/AwaitBotClient.ts'

console.log('Awaitbot starting:')

console.log('Initializing database connection ...')
const dbUrl = Deno.env.get("DB_CONN_URL")
const dbAnonPublicKey = Deno.env.get("DB_PUBLIC_ANON_KEY")
if (dbUrl === undefined || dbAnonPublicKey === undefined) {
  console.log('You must supply the Supabase DB_PUBLIC_ANON_KEY and DB_CONN_URL in the environment.')
  Deno.exit()
}
const db = await createClient(dbUrl, dbAnonPublicKey)
console.log('Database successfully connected.')

const botToken = Deno.env.get("DISCORD_BOT_TOKEN")
if (botToken === undefined) {
  console.log('Fatal: No token provided (DISCORD_BOT_TOKEN must be in the process environment).')
  Deno.exit()
}
console.log('Initializing bot client ...')
const bot = new AwaitBotClient()
await bot.connect(botToken, [
  GatewayIntents.GUILDS,
])

console.log('Bot initialized. Listening ...')
