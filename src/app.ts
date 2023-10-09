import { Client } from "discord.js";
import 'dotenv/config'

console.log("Bot is starting...");

const client = new Client({
    intents: []
});

client.login(process.env.DISCORD_TOKEN);

console.log(client);
