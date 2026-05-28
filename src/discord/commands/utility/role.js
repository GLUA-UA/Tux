
// Grupo de Linux da Universidade de Aveiro (GLUA)
// BOT do servidor de discord

// Modified:
// v1 - 28/05/2026 by Martin Pereirinha

// Informação:
// Este comando serve para atribuir ou remover um role (cargo) num servidor,
// foi configurado para ser usado apenas por elementos com o id do role
// definido como "permRole". Substituir os campos [RANKID] no código confome
// as indicações abaixo:

const { SlashCommandBuilder, roleMention } = require('discord.js');

module.exports = {

    cooldown: 5,
	data: new SlashCommandBuilder()
        .setName('suporte')
        .setDescription('Ativar/Desativar pings para pedidos de ajuda no servidor.'),

	async execute(interaction) {

        // Permissões. Substituir o [RANKID] pelo id do role que VAI TER ACESSO ao comando. Sugestão: "Membros"
        const permRole = '[RANKID]';

        // Role alvo. Substituir o [RANKID] pelo id do role que VAI SER ADICIONADO/REMOVIDO
        const targetRole = '[RANKID]';
        
        // Verificar permissões (O utilizador tem de ter o cargo cujo id = permRole)
        if(interaction.member.roles.cache.has(permRole)){

            if(interaction.member.roles.cache.has(targetRole)){     // Se já tem role, remover

                await interaction.member.roles.remove(targetRole);
                await interaction.reply('[INFO] Pings para pedidos de ajuda online foram desativadas!');

            } else {                                                // Se não tem role, adicionar

                await interaction.member.roles.add(targetRole);       
                await interaction.reply('[INFO] Pings para pedidos de ajuda online foram ativadas!');

            }

        } else {                                                    // Caso contrario, mandar feedb ack com mensagem de erro
            await interaction.reply('[ERROR] Comando de uso restrito! (Access denied)');
        }
		
	},
};