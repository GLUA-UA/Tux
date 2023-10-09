import dotenv from "dotenv";
dotenv.config();

import { TuxClient } from "./discord/TuxClient";
const discordToken = process.env.DISCORD_TOKEN;
if (!discordToken) throw new Error("No Discord token provided.");
new TuxClient().run(discordToken);