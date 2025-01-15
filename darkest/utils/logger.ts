class Logger {
    private name: string;
    constructor(name: string) {
        this.name = name
    }

    Log(message: string) {
        console.log(`[${this.name}]: ${message}`);
    }

    LogError(message: string) {
        console.error(`[${name}]: ${message}`);
    }
}

export default Logger;