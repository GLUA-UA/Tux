import { SlashCommandBuilder, CommandInteraction, GuildMember } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ajuda")
    .setDescription("Atribui ou remove o cargo de Ajuda Online.");
export async function execute(interaction: CommandInteraction) {
    const roleId = process.env.AJUDA_ROLE_ID; //ID do cargo

    if (!roleId) {
        await interaction.reply({ content: "Erro: O ID do cargo não está configurado no sistema!", ephemeral: true });
        return;
    }
    
    if (!interaction.guild || !(interaction.member instanceof GuildMember)) {
        await interaction.reply({ content: "Este comando só pode ser usado num servidor.", ephemeral: true });
        return;
    }

    const member = interaction.member;
    const role = interaction.guild.roles.cache.get(roleId);

    //Se o cargo não existir
    if (!role) {
        await interaction.reply({ content: "O cargo de ajuda não foi encontrado no servidor!", ephemeral: true });
        return;
    }

    //Verifica se o membro já tem o cargo
    if (member.roles.cache.has(roleId)) {
        //Se tiver, remove o cargo
        await member.roles.remove(roleId);
        await interaction.reply({ content: "Cargo de Ajuda Online removido com sucesso!", ephemeral: true });
    } else {
        //Se não tiver, adiciona o cargo
        await member.roles.add(roleId);
        await interaction.reply({ content: "Cargo de Ajuda Online adicionado com sucesso!", ephemeral: true });
    }
}