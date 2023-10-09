import { ActivityType, Client } from "discord.js";
import Logger from "../../Logger";

export async function run(client: Client) {
    client.user?.setPresence({ activities: [{ name: "SuperTux", type: ActivityType.Playing }] });

    Logger.log(`Bot Ready! Logged in as ${client.user?.tag ?? "unknown"}`);
}