import { Client } from "discord.js";
import Logger from "../Logger";

export class MemberCounterHelper {
    private intervalTime = 1000 * 60 * 10; // 10 minutes
    private interval: NodeJS.Timeout | null = null;

    private client: Client;

    private memberCount = -1;
    private gluaMemberCount = -1;

    private memberChannelId = process.env.MEMBER_CNT_CHANNEL;
    private memberChannelString = process.env.MEMBER_CNT_STRING ?? "Server: {n}";

    private gluaRoleId = process.env.GLUA_ROLE;
    private gluaChannelId = process.env.GLUA_CNT_CHANNEL;
    private gluaChannelString = process.env.GLUA_CNT_STRING ?? "GLUA: {n}";

    constructor(client: Client) {
        this.client = client;
    }

    public start() {
        Logger.debug("Starting member counter helper");
        this.interval = setInterval(() => {
            Logger.debug("Updating member counts");
            this.updateMemberCount();
            this.updateGluaMemberCount();
        }, this.intervalTime);
    }

    public stop() {
        if (this.interval) {
            Logger.debug("Stopping member counter helper");
            clearInterval(this.interval);
        }
    }

    private async updateMemberCount() {
        if (!this.memberChannelId) return;

        const guild = this.client.guilds.cache.at(0);
        if (!guild) return;

        const memberChannel = await guild.channels.fetch(this.memberChannelId).catch(() => null);
        if (!memberChannel) return;

        const members = await guild.members.fetch();
        const humanMembers = members.filter((m) => !m.user.bot).size;

        if (this.memberCount !== humanMembers) {
            this.memberCount = humanMembers;
            const channelName = this.memberChannelString.replace("{n}", `${this.memberCount}`);
            Logger.debug(`Updated member count to ${this.memberCount}`);
            Logger.debug(`Setting channel name to ${channelName}`);
            memberChannel.setName(channelName);
        }
    }

    private async updateGluaMemberCount() {
        if (!this.gluaChannelId) return;
        if (!this.gluaRoleId) return;

        const guild = this.client.guilds.cache.at(0);
        if (!guild) return;

        const gluaChannel = await guild.channels.fetch(this.gluaChannelId).catch(() => null);
        if (!gluaChannel) return;

        const members = await guild.members.fetch();
        const gluaMembers = members.filter((m) => m.roles.cache.has(this.gluaRoleId!)).size;

        if (this.gluaMemberCount !== gluaMembers) {
            this.gluaMemberCount = gluaMembers;
            const channelName = this.gluaChannelString.replace("{n}", `${this.gluaMemberCount}`);
            Logger.debug(`Updated GLUA member count to ${this.gluaMemberCount}`);
            Logger.debug(`Setting channel name to ${channelName}`);
            gluaChannel.setName(channelName);
        }
    }

}
