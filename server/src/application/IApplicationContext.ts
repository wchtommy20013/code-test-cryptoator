import { RouteInformation } from "./model/RouteInformation";
import express = require('express');
import * as http from 'http';
import { Request, Response } from 'express-serve-static-core';
import { RequestMethod } from "./decorators/RouteDefinition";

export interface IApplicationContext {
    setting: ApplicationSetting;
    app: express.Application;
    server: http.Server;

    init(): void;

    route(requestMethod: RequestMethod, route: RouteInformation, callback: (request: Request, response: Response) => void): void;
    routeGet(route: RouteInformation, callback: (request: Request, response: Response) => void): void;
    routePost(route: RouteInformation, callback: (request: Request, response: Response) => void): void;
    routePut(route: RouteInformation, callback: (request: Request, response: Response) => void): void;
    routeDelete(route: RouteInformation, callback: (request: Request, response: Response) => void): void;

    removeRoute(path: string): void;
}

export interface FileUploadOption {
    fieldNames: string[];
}

export interface ApplicationSetting {
    httpPort: number;
    serviceIP: string;
    key: string;
    onWssConnected?: (ws: WebSocket) => void;
    forceShutDownTime?: number;
    maxFileUploadSize?: number;
}
