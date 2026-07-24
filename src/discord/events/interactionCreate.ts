import { Interaction } from "discord.js";
import { createProject } from "../ProjectManager"; 
import Logger from "../../Logger";

export async function run(...args: any[]) {
    const interaction = args.find(arg => arg && typeof arg.isChatInputCommand === 'function') as Interaction;

    if (!interaction || !interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'projeto') {
        const projectName = interaction.options.getString('nome', true);
        const guild = interaction.guild;

        if (!guild) {
            await interaction.reply({ content: '❌ Este comando só pode ser usado dentro de um servidor.', ephemeral: true });
            return;
        }

        try {
            await interaction.reply({ content: `⏳ A criar a estrutura do projeto **${projectName}**... Por favor aguarda.`, ephemeral: true });

            // Executar a função do ProjectManager para criar os canais e cargo
            const result = await createProject(guild, projectName);

            if (result.success && result.role) {
                // Dar o cargo a quem executou o comando
                try {
                    const member = await guild.members.fetch(interaction.user.id);
                    await member.roles.add(result.role);
                } catch (roleError) {
                    Logger.log(`Aviso: Projeto criado, mas falhou ao dar o cargo ao utilizador: ${roleError}`);
                }

                // Atualizar a mensagem final
                await interaction.editReply(`✅ O projeto **${projectName}** foi criado com sucesso! Foste adicionado ao projeto com o cargo <@&${result.role.id}>.`);
                Logger.log(`Projeto '${projectName}' criado com sucesso por ${interaction.user.tag}`);
            } else {
                await interaction.editReply(`❌ Ocorreu um erro ao criar o projeto. Garante que o meu cargo está acima dos cargos normais e que tenho permissões de Administrador.`);
                Logger.log(`Erro ao criar projeto '${projectName}': ${result.error}`);
            }
        } catch (error) {
            Logger.log(`Erro ao executar o comando /projeto: ${error}`);
        }
    }
}