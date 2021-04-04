export interface IAppConfig {
    environment: {
        address: string;
        port: string;
        key: string;
    };
    throttleTimeLimitSecond: number;
    standardCacheTTL: number;
}
