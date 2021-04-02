import { RouteDefinition, RequestMethod } from './RouteDefinition';
import { Request, Response, request } from 'express';
import 'reflect-metadata';
import { RouteInformation } from '../model/RouteInformation';
import { RouteOptions } from './RouteOptions';
import { IApplicationContext } from '../IApplicationContext';
import { LogType } from '@server/entity/log/model/LogType';
import { LogService } from '@server/entity/log/service/LogService'; 5
import { BaseController } from '@server/controller/BaseController';
import { handleError } from '../utils/handleError';
import * as Swagger from '../swagger/Swagger';
import { IRequestParam } from './model/IRequestParam';
import { Authorization } from '../model/Authorization';


export const RequestParameterKey = Symbol('RequestParam');

export const applyRoute = (controllers: (typeof BaseController)[], context: IApplicationContext) => {
    controllers.forEach(controller => {
        const instance = new controller();
        const prefix = Reflect.getMetadata('prefix', controller);

        const routes: Array<RouteDefinition> = Reflect.getMetadata(`routes[${controller.name}]`, controller);
        routes.forEach(route => {
            const option: RouteInformation = {
                path: [prefix, ...route.path.split("/")].join("/").replace(/\/\//g, "/"),
                noAuth: route.options.noAuth || false,
            }

            context.route(route.requestMethod, option, async (request: Request, response: Response) => {
                return call(request, response, (instance as any)[route.methodName]);
            });


            LogService.log(LogType.Route, `${route.requestMethod.toUpperCase()}\t${prefix}${route.path}`);
            Swagger.registerEndpoint({
                prefix,
                method: route.requestMethod,
                path: option.path,
                auth: !route.options.noAuth || false,
            });
        });
    });
    Swagger.generate();
}

const call = async (request: Request, response: Response, callback: (request: Request, response: Response) => Promise<any>) => {
    try {
        const result = await callback(request, response);
        return response.json(result);
    } catch (e) {
        handleError(e, response);
    }
}


export const Route = (path: string, requestMethod: RequestMethod, options?: RouteOptions): MethodDecorator => {
    return (target, propertyKey, descriptor): void => {
        if (!Reflect.hasMetadata(`routes[${target.constructor.name}]`, target.constructor)) {
            Reflect.defineMetadata(`routes[${target.constructor.name}]`, [], target.constructor);
        }

        const requiredParameters: IRequestParam[] = Reflect.getOwnMetadata(
            RequestParameterKey,
            target,
            propertyKey
        );

        const routes = Reflect.getMetadata(`routes[${target.constructor.name}]`, target.constructor) as Array<RouteDefinition>;

        options = options || {};
        if (requiredParameters) {
            // files
            const files = requiredParameters.filter(x => x.dataType === 'file' || x.dataType === 'files');
            if (files.length > 0) {
                options.files = [];
                for (const f of files) {
                    const fname = f.dataName!;
                    options.files.push(fname);
                }
            }
        }

        routes.push({
            requestMethod: requestMethod,
            path,
            methodName: propertyKey as string,
            options,
        });
        Reflect.defineMetadata(`routes[${target.constructor.name}]`, routes, target.constructor);


        Swagger.registerMethod({
            name: propertyKey as string,
            path,
            requiredParameters,
        });

        // Process params
        let method = descriptor.value!;
        (descriptor.value! as any) = function (request: Request, response: Response) {
            const args = arguments;
            if (requiredParameters) {
                for (let input of requiredParameters) {
                    if (args.length <= input.index) {
                        args.length = input.index + 1;
                    }
                    switch (input.dataType) {
                        case "request":
                            args[input.index] = request
                            break;
                        case "response":
                            args[input.index] = response
                            break;
                        case "authorization":
                            args[input.index] = Authorization.fromHeader((request as any)['headers']['authorization']);
                            break;
                        default:
                            if (input.dataName) {
                                args[input.index] = (request as any)[input.dataType][input.dataName];
                            } else {
                                args[input.index] = (request as any)[input.dataType];
                            }
                            break;
                    }

                }
            }

            return (method as any).apply({}, args);
        };
    };
}

export const Get = (path: string, options?: RouteOptions): MethodDecorator => {
    return Route(path, 'get', options);
};

export const Post = (path: string, options?: RouteOptions): MethodDecorator => {
    return Route(path, 'post', options);
};

export const Put = (path: string, options?: RouteOptions): MethodDecorator => {
    return Route(path, 'put', options);
};

export const Delete = (path: string, options?: RouteOptions): MethodDecorator => {
    return Route(path, 'delete', options);
};

