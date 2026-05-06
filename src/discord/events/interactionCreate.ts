import { Client, Interaction } from "discord.js";
import * as ajudaCommand from "../commands/ajuda";

export async function run(client: Client, interaction: Interaction) {
    //Verifica se a interação é um comando de barra
    if (!interaction.isChatInputCommand()) return;

    //Executa se for o "Ajuda"
    if (interaction.commandName === "ajuda") {
        try {
            await ajudaCommand.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Houve um erro ao executar o comando!', ephemeral: true });
        }
    }
}