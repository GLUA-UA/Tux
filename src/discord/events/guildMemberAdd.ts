import { Client, GuildMember } from "discord.js";

const AUTO_ROLE: string = process.env.AUTO_ROLE ?? "";

export async function run(client: Client, member: GuildMember) {
    giveAutoRole(member);
}

async function giveAutoRole(member: GuildMember) {
    if (AUTO_ROLE == "") return;

    member.roles.add(await member.guild.roles.fetch(AUTO_ROLE) ?? "");
}

