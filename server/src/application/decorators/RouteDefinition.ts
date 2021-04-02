import { RouteOptions } from "./RouteOptions";

export type RequestMethod =  'get' | 'post' | 'delete' | 'put';
export interface RouteDefinition {
    path: string;
    requestMethod: RequestMethod;
    methodName: string;
    options: RouteOptions;
}
