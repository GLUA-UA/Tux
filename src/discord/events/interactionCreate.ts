import { Client, Interaction } from "discord.js";
import { MessageFlags } from "discord.js";
import CommandRegistry from "../registry/CommandRegistry";

export function run(_: Client, interaction: Interaction) {
    if (interaction.isChatInputCommand()) runCommand(_, interaction);
}

function runCommand(_: Client, interaction: Interaction) {
    // If the interaction is not a command, return
    if (!interaction.isChatInputCommand()) return;

    // Get the command from the collection
    const command = CommandRegistry.getCommand(interaction.commandName);

    // If the command does not exist, return
    if (!command) {
        interaction.reply({ content: "Command not found.", flags: MessageFlags.Ephemeral });
        return;
    }

    // Try to run the command
    try {
        command.execute(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply({ content: "There was an error while executing this command!", flags: MessageFlags.Ephemeral });
    }
}