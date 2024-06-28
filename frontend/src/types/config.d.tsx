declare module 'config.json' {
    interface Config {
        domain: string;
        apiPort: number;
    }

    const value: Config;
    export = value;
}
