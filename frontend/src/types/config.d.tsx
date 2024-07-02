declare module 'config.json' {
    interface Config {
        domain: string;
        apiPort: number;
        version: string;
        codename: string;
    }

    const value: Config;
    export = value;
}
