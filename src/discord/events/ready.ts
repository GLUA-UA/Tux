import { ActivityType, Client, SlashCommandBuilder } from "discord.js";
import Logger from "../../Logger";
import { MemberCounterHelper } from "../MemberCountHelper";
import * as dotenv from 'dotenv';

dotenv.config();

export async function run(client: Client) {
    client.user?.setPresence({ activities: [{ name: "SuperTux", type: ActivityType.Playing }] });

    Logger.log(`Bot Ready! Logged in as ${client.user?.tag ?? "unknown"}`);

    new MemberCounterHelper(client).start();

    const projectCommand = new SlashCommandBuilder()
        .setName('projeto')
        .setDescription('Cria canais e um cargo para um novo projeto.')
        .addStringOption(option => 
            option.setName('nome')
                .setDescription('O nome do projeto que queres criar')
                .setRequired(true)
        );

    try {
        const guildId = process.env.GUILD_ID;
        
        if (guildId) {
            const guild = await client.guilds.fetch(guildId);
            await guild.commands.create(projectCommand);
        } else {
            await client.application?.commands.create(projectCommand);
        }
    } catch (error) {
        Logger.log(`❌ Erro ao registar o comando /projeto: ${error}`);
    }
}