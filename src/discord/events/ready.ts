import { ActivityType, Client, GuildBasedChannel, GuildMember } from "discord.js";
import Logger from "../../Logger";

const GLUA_ROLE: string = process.env.GLUA_ROLE ?? "";
const GLUA_CNT_CHANNEL: string = process.env.GLUA_CNT_CHANNEL ?? "";
const MEMBER_CNT_CHANNEL: string = process.env.MEMBER_CNT_CHANNEL ?? "";

export async function run(client: Client) {
    client.user?.setPresence({ activities: [{ name: "SuperTux", type: ActivityType.Playing }] });

    Logger.log(`Bot Ready! Logged in as ${client.user?.tag ?? "unknown"}`);

    const guild = client.guilds.cache.at(0);
    if (guild == null) return;

    const members = await guild.members.fetch();
    const gluaMembers = members?.filter((m: GuildMember) => m.roles.cache.has(GLUA_ROLE)).size;
    const humanMembers = members?.filter((m: GuildMember) => !m.user.bot).size;

    const c = await guild.channels.fetch(GLUA_CNT_CHANNEL);

    if (c == null) return;

    Logger.debug(`GLUA: ${gluaMembers}`);
    c.setName(`GLUA: ${gluaMembers}`);

    const c1 = await guild.channels.fetch(MEMBER_CNT_CHANNEL);

    if (c1 == null) return;

    Logger.debug(`Membros: ${humanMembers}`);
    c1.setName(`Membros: ${humanMembers}`);
}