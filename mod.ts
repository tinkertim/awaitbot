import "https://deno.land/std@0.171.0/dotenv/load.ts";
import { GatewayIntents } from "./deps.ts";
import { log } from "./deps.ts";
import { AwaitBotClient } from "./src/AwaitBotClient.ts";

const botToken = Deno.env.get("DISCORD_BOT_TOKEN");
if (botToken === undefined) {
  log.critical(
    "Fatal: No token provided (DISCORD_BOT_TOKEN must be in the process environment).",
  );
  Deno.exit();
}
log.info("Initializing bot client ...");
const bot = new AwaitBotClient();
await bot.connect(botToken, [
  GatewayIntents.GUILDS,
]);

log.info("Bot initialized.");
