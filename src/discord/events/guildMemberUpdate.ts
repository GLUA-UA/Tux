import { Client, GuildBasedChannel, GuildMember, Role } from "discord.js";
import Logger from "../../Logger";

const GLUA_ROLE: string = process.env.GLUA_ROLE ?? "";
const GLUA_CNT_CHANNEL: string = process.env.GLUA_CNT_CHANNEL ?? "";

function hasRole(member: GuildMember, roleId: string): boolean {
    return member.roles.cache
        .map((r: Role) => r.id)
        .includes(roleId);
}

export async function run(client: Client, before: GuildMember, after: GuildMember) {
    if (GLUA_ROLE == "") {
        Logger.error("GLUA role not found");
        return;
    }
    if (GLUA_CNT_CHANNEL == "") {
        Logger.error("GLUA role not found");
        return;
    }

    const updateGluaMembership = !hasRole(before, GLUA_ROLE) && hasRole(after, GLUA_ROLE) ||
        hasRole(before, GLUA_ROLE) && !hasRole(after, GLUA_ROLE);
    if (!updateGluaMembership) {
        Logger.debug(`${after.displayName} did not join or leave GLUA`);
        return;
    }

    const members = await after.guild?.members.fetch();
    const gluaMembers = members?.filter((m: GuildMember) => m.roles.cache.has(GLUA_ROLE)).size;
    const humanMembers = members?.filter((m: GuildMember) => !m.user.bot).size;

    Logger.debug(`updated member: ${after.displayName}, now GLUA has ${gluaMembers}/${humanMembers} memebrs!`);

    const c = await after.guild.channels.fetch(GLUA_CNT_CHANNEL);

    if(c == null) return;
        
    Logger.debug(`GLUA: ${gluaMembers}`);
    c.setName(`GLUA: ${gluaMembers}`);
}