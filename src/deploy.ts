import { REST, Routes } from "discord.js";
import { config } from "dotenv";
import * as ajudaCommand from "./discord/commands/ajuda";

config();

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token || !clientId || !guildId) {
    console.error("⚠️ Faltam dados no teu ficheiro .env! Verifica se tens o Token, Client ID e Guild ID.");
    process.exit(1);
}

const commands = [
    ajudaCommand.data.toJSON()
];

const rest = new REST({ version: '10' }).setToken(token);

async function deploy() {
    try {
        console.log(`A enviar ${commands.length} comando(s) para o teu servidor de testes...`);

        await rest.put(
            Routes.applicationGuildCommands(clientId!, guildId!),
            { body: commands }
        );

        console.log("✅ Comandos registados com sucesso no Discord!");
    } catch (error) {
        console.error("❌ Houve um erro ao registar os comandos:", error);
    }
}

deploy();