export type ConsoleOutputType = "warn" | "error" | "debug" | "info";

const colors: Record<ConsoleOutputType, Record<"time" | "message", string>> = {
    warn: {
        time: "\x1b[43m",
        message: "\x1b[33m"
    },
    error: {
        time: "\x1b[41m",
        message: "\x1b[31m"
    },
    debug: {
        time: "\x1b[46m",
        message: "\x1b[36m"
    },
    info: {
        time: "\x1b[42m",
        message: "\x1b[32m"
    }
};

const resetColor = "\x1b[0m";

const getCurrentTime = (): string => new Date().toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }).replace(",", "").replace(/\//g, "-");

class Logger {

    public log(message: string | object, type: ConsoleOutputType = "info"): void {
        if (type === "debug" && !["True", "true", "1"].includes(process.env.DEBUG ?? "false")) return;
        if (typeof message === "object") message = JSON.stringify(message);
        console.log(`${colors[type].time}[${getCurrentTime()}]${resetColor}${colors[type].message} ${message}${resetColor}`);
    }

    public warn(message: string | object): void {
        this.log(message, "warn");
    }

    public error(message: string | Error | object): void {
        if (message instanceof Error) message = message.stack ?? message.message;
        this.log(message, "error");
    }

    public debug(message: string | object): void {
        this.log(message, "debug");
    }

    public info(message: string | object): void {
        this.log(message, "info");
    }

}

export default new Logger();