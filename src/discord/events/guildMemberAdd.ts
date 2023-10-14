import { Client, GuildBasedChannel, GuildMember, Role } from "discord.js";
import Logger from "../../Logger";

const MEMBER_CNT_CHANNEL: string = process.env.MEMBER_CNT_CHANNEL ?? "";
const AUTO_ROLE: string = process.env.AUTO_ROLE ?? "";
const GLUA_CNT_STRING: string = process.env.GLUA_CNT_STRING ?? "";
const MEMBER_CNT_STRING: string = process.env.MEMBER_CNT_STRING ?? "";

export async function run(client: Client, member: GuildMember) {
    updateMemberCount(member);
    giveAutoRole(member);
}

async function updateMemberCount(member: GuildMember) {
    const members = await member.guild?.members.fetch();
    const humanMembers = members?.filter((m: GuildMember) => !m.user.bot).size;

    Logger.debug(`New discord member: ${member.displayName}. The server has ${humanMembers} humans.`);

    const c = await member.guild.channels.fetch(MEMBER_CNT_CHANNEL);

    if (c == null) return;

    Logger.debug(MEMBER_CNT_STRING.replace("{n}", `${humanMembers}`));
    c.setName(MEMBER_CNT_STRING.replace("{n}", `${humanMembers}`));
}

async function giveAutoRole(member: GuildMember) {
    if (AUTO_ROLE == "") return;

    member.roles.add(await member.guild.roles.fetch(AUTO_ROLE) ?? "");
}

