import { Events, ThreadChannel } from "discord.js";

export const name = Events.ThreadCreate;

export const run = async (...args: any[]) => {
    console.log("\n--- NOVA THREAD DETETADA ---");
    
    const thread: ThreadChannel = args[0]?.guildId ? args[0] : args[1];

    if (!thread) {
        console.log("❌ PAROU: Não consegui detetar o objeto da thread.");
        return;
    }

    const helpdeskChannelId = process.env.HELPDESK_CHANNEL_ID?.trim();
    const ajudaRoleId = process.env.AJUDA_ROLE_ID?.trim();

    if (!helpdeskChannelId || !ajudaRoleId) {
        console.log("❌ PAROU: As variáveis no .env não estão configuradas.");
        return;
    }

    const actualChannelId = thread.parentId || thread.parent?.id;
    console.log("2. O canal real onde a thread nasceu é:", actualChannelId);

    if (actualChannelId !== helpdeskChannelId) {
        console.log("❌ PAROU: O canal real não é igual ao canal esperado.");
        return;
    }

    console.log("✅ 3. IDs coincidem perfeitamente! A enviar mensagem...");
    
    try {
        await thread.send({
            content: `Olá! A tua dúvida foi registada. Alguém da equipa de <@&${ajudaRoleId}> vai ajudar-te assim que possível!`
        });
        console.log("🚀 4. Mensagem enviada com sucesso para o Discord!");
    } catch (error) {
        console.error("❌ 4. Ocorreu um erro a enviar a mensagem:", error);
    }
};