import { AppConfig } from '@server/common/config/AppConfig';
import { LogType } from '@server/entity/log/model/LogType';
import { LogService } from '@server/entity/log/service/LogService';
import { writeFileSync, unwatchFile } from 'fs';
import { join } from 'path';
import { IRequestParam } from '../decorators/model/IRequestParam';
import { ISwaggerEndpoint } from './model/ISwaggerEndpoint';
import { ISwaggerMethod } from './model/ISwaggerMethod';

const dataTypeMap: any = {
    query: "query",
    headers: "header",
    params: "path"
}

const prefixTag: any = {
    "": {
        name: "Default",
        description: "Default route"
    }
}

let config: any = {};
let _method: { [path: string]: ISwaggerMethod } = {};

export const configure = (cfg: unknown) => {
    config = cfg;
};

export const registerMethod = (method: ISwaggerMethod) => {
    _method[method.path] = method;
};

export const registerEndpoint = (endpoint: ISwaggerEndpoint) => {
    if (!swagger.paths[endpoint.path]) {
        swagger.paths[endpoint.path] = {};
    }

    const pathDefinition: any = {
        produces: ['application/json'],
        tags: [
            (prefixTag[endpoint.prefix] ? prefixTag[endpoint.prefix].name : "Default")
        ],
        parameters: [],
        responses: {
            200: {},
        },
    };

    let parameters: any[] = [];
    // @User, @Param, etc.
    // TODO :id -> {id}
    if (_method[endpoint.path] && _method[endpoint.path].requiredParameters) {
        for(const p of _method[endpoint.path].requiredParameters!){
            if(dataTypeMap[p.dataType]){
                parameters.push({
                    name: p.dataName || p.dataType,
                    in: dataTypeMap[p.dataType],
                });
            }    
        }
    }
    // @Authenicate
    if(endpoint.auth){
        parameters.push({
            name: "Authorization",
            in: dataTypeMap["headers"],
            schema:{
                type: "string",
                default:"5edec5ca-e94c-4640-a525-d34561d7ec0a"// AppConfig.apikey[Object.keys(AppConfig.apikey)[0]],
            }
        })
    }

    pathDefinition.parameters = parameters;
    swagger.paths[endpoint.path][endpoint.method] = pathDefinition;
};

export const generate = () => {
    if (process.env.NODE_ENV === 'development') {
        const dest = join(__dirname, '../../../docs/swagger.json');
        writeFileSync(dest, JSON.stringify(swagger, null, 2), {
            flag: 'w+',
        });
        LogService.log(LogType.Server, `Wrote swagger file to ${dest}`);
    }
};

const swagger: any = {
    swagger: '2.0',
    info: {
        description: 'Swagger',
        version: '1',
        title: 'Swagger',
    },
    tags: Object.values(prefixTag),
    paths: {},
};
