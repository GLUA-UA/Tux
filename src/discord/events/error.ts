import Logger from "../../Logger";

export async function run(error: Error) {
    Logger.error(error.stack ?? error.message);
}