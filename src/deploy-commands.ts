import { Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest"
require("dotenv").config();

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;

if (!token || !clientId) {
    console.error("Missing environment variables. Please check your .env file.");
    process.exit(1);
}

const commands = [
    new SlashCommandBuilder()
        .setName('signature')
        .setDescription('Creates a personalized signature')
        // Request the user's name
        .addStringOption(option => option
            .setName('name')
            .setDescription('Signature name')
            .setRequired(true))
        // Request the user's position
        .addStringOption(option => option
            .setName('position')
            .setDescription('Signature position')
            .setRequired(true)),
]

const rest = new REST({ version: '10' }).setToken(token!);

rest.put(Routes.applicationCommands(clientId!), { body: commands })
    .then((data: any) => console.log(`Successfully registered ${data.length} global application commands.`))
    .catch(console.error);