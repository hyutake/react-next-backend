export const log = (name: string, message: string) => {
    console.log(`[${name}]: ${message}`);
}

export const error = (name: string, message: string) => {
    console.error(`[${name}]: ${message}`);
}