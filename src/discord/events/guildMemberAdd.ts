import { Client, GuildBasedChannel, GuildMember, Role } from "discord.js";
import Logger from "../../Logger";

const MEMBER_CNT_CHANNEL: string = process.env.MEMBER_CNT_CHANNEL ?? "";
const AUTO_ROLE: string = process.env.AUTO_ROLE ?? "";

export async function run(client: Client, member: GuildMember) {
    const members = await member.guild?.members.fetch();
    const humanMembers = members?.filter((m: GuildMember) => !m.user.bot).size;

    Logger.debug(`New discord member: ${member.displayName}. The server has ${humanMembers} humans.`);

    const c = await member.guild.channels.fetch(MEMBER_CNT_CHANNEL);

    if (c == null) return;

    if (AUTO_ROLE == "") return;

    member.roles.add(await member.guild.roles.fetch(AUTO_ROLE)??"")

    Logger.debug(`Membros: ${humanMembers}`);
    c.setName(`Membros: ${humanMembers}`);
}