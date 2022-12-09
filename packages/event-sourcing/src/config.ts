export interface EventStoreConfig {
    host: string;
    port: string | number;
    insecure?: boolean;
}

export interface Config {
    eventstore: EventStoreConfig;
}
