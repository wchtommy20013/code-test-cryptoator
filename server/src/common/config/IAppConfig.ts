export interface IAppConfig {
    environment: {
        address: string;
        port: string;
        key: string;
    };
    throttleTimeLimit: number;
}
