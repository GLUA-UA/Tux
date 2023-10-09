import { readdirSync } from "fs";
import { Client, ClientOptions } from "discord.js";
import Logger from "../Logger";

export class TuxClient {
    private client: Client;

    constructor(clientOptions: ClientOptions = { intents: ["Guilds"] }) {
        this.client = new Client(clientOptions);
    }

    public async run(token: string) {
        await this.registerEvents();
        this.login(token);
    }

    private async registerEvents() {
        const registeredEvents: string[] = [];
        const filesOnDir = readdirSync(__dirname + "/events");
        for (const file of filesOnDir) {
            const event = await import(__dirname + `/events/${file}`);
            this.client.on(file.split(".")[0], (...args) => event.run(this.client, ...args));
            registeredEvents.push(file.split(".")[0]);
        }
        Logger.log(`Registered ${registeredEvents.length} events: ${registeredEvents.join(", ")}`);
    }

    private async login(token: string) {
        this.client.login(token);
    }

}