import { Client, GuildMember } from "discord.js";
import Logger from "../../Logger";

const AUTO_ROLE = process.env.AUTO_ROLE;

export async function run(client: Client, member: GuildMember) {
    giveAutoRole(member);
}

async function giveAutoRole(member: GuildMember) {
    if (!AUTO_ROLE) return;
    Logger.debug(`Giving ${member.user.tag} (${member.user.id}) the auto role`);
    member.roles.add(AUTO_ROLE);
}
