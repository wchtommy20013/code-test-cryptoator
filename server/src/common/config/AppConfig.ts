import { IAppConfig } from './IAppConfig';

export const AppConfig: IAppConfig = 
    (process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'development') ? 
        require("@server/../appconfig.dev.json") : 
    (process.env.NODE_ENV === 'unit-test') ? 
        require("@server/../appconfig.test.json") :
        require("@server/../appconfig.json");
