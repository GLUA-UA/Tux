import { Guild, ChannelType, PermissionsBitField, Role, CategoryChannel } from 'discord.js';

/**
 * @param guild O servidor do Discord onde os elementos serão criados.
 * @param projectName O nome do projeto.
 */
export async function createProject(guild: Guild, projectName: string): Promise<{ success: boolean; role?: Role; category?: CategoryChannel; error?: any }> {
    try {
        // 1. Criar o Cargo para o Projeto
        const projectRole = await guild.roles.create({
            name: projectName,
            color: 'Random', // Podes alterar para uma cor hexadecimal em string, ex: '#FF5733'
            reason: `Cargo gerado automaticamente para o projeto: ${projectName}`,
        });

        // 2. Criar a Categoria Privada (Visível apenas para o novo cargo e admins)
        const projectCategory = await guild.channels.create({
            name: `📁 ${projectName}`,
            type: ChannelType.GuildCategory,
            permissionOverwrites: [
                {
                    id: guild.id, // O ID do servidor equivale ao cargo @everyone
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: projectRole.id, // O ID do novo cargo do projeto
                    allow: [PermissionsBitField.Flags.ViewChannel],
                },
            ],
            reason: `Categoria gerada para o projeto: ${projectName}`,
        });

        // 3. Criar o Canal de Texto dentro da categoria
        // Formatamos o nome para letras minúsculas e substituímos espaços por hífens
        const textChannelName = `💬-geral-${projectName.toLowerCase().replace(/\s+/g, '-')}`;
        await guild.channels.create({
            name: textChannelName,
            type: ChannelType.GuildText,
            parent: projectCategory.id, // Coloca o canal dentro da categoria criada
        });

        // 4. Criar o Canal de Voz dentro da categoria
        await guild.channels.create({
            name: `🔊 Reuniões`,
            type: ChannelType.GuildVoice,
            parent: projectCategory.id,
        });

        return { success: true, role: projectRole, category: projectCategory };

    } catch (error) {
        console.error(`[ProjectManager] Erro ao criar a estrutura do projeto ${projectName}:`, error);
        return { success: false, error };
    }
}