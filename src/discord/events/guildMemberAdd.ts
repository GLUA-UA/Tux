import { Client, GuildBasedChannel, GuildMember, Role } from "discord.js";
import Logger from "../../Logger";

const MEMBER_CNT_CHANNEL: string = process.env.MEMBER_CNT_CHANNEL ?? "";

var last_sync = 0;

export async function run(client: Client, member: GuildMember) {
    const members = await member.guild?.members.fetch();
    const humanMembers = members?.filter((m: GuildMember) => !m.user.bot).size;

    Logger.debug(`New discord member: ${member.displayName}. The server has ${humanMembers} humans.`);

    const c = await member.guild.channels.fetch(MEMBER_CNT_CHANNEL);

    if (c == null) return;

    Logger.debug(`Membros: ${humanMembers}`);
    c.setName(`Membros: ${humanMembers}`);
}