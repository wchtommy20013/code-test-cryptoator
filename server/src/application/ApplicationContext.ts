import express = require('express');
import * as http from 'http';
import * as cors from 'cors';
import bodyParser = require('body-parser');
import multer = require("multer");
import { ApplicationSetting, FileUploadOption, IApplicationContext } from './IApplicationContext';
import { createGracefulShutdownMiddleware } from './utils/gracefulShutdown';
import { LogService } from '@server/entity/log/service/LogService';
import { LogType } from '@server/entity/log/model/LogType';
import { RouteInformation } from './model/RouteInformation';
import { Request, Response } from 'express-serve-static-core';
import { RequestMethod } from './decorators/RouteDefinition';
import { handleError } from './utils/handleError';


export class ApplicationContext implements IApplicationContext {
    public app: express.Application;
    public server: http.Server;

    protected router = express.Router()
    protected lock: { [lockId: string]: boolean } = {};

    public constructor(public setting: ApplicationSetting) {
        this.app = express();
        this.server = http.createServer(this.app);

        this.app.use(createGracefulShutdownMiddleware(this.server));

        this.app.use(cors.default())

        this.app.use(bodyParser.json({ limit: '1000mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '1000mb', extended: false }));

        this.app.use((req, res, next) => {
            this.router(req, res, next)
        });
    }

    public init() {
        try {
            let httpPort = this.setting.httpPort;
            this.server = this.app.listen(httpPort, async () => {
                LogService.log(LogType.Server, `HTTP server started on port ${httpPort}`);
            });
        } catch (e) {
            LogService.error(LogType.Server, e);
            throw e;
        }
    }

    // Standard Route
    public route(requestMethod: RequestMethod, route: RouteInformation, callback: (request: Request, response: Response) => void) {
        switch (requestMethod) {
            case "get":
                this.routeGet(route, callback);
                break;
            case "post":
                this.routePost(route, callback);
                break;
            case "delete":
                this.routeDelete(route, callback);
                break;
            case "put":
                this.routePut(route, callback);
                break;
        }
    }


    public routeGet(route: RouteInformation, callback: (request: Request, response: Response,) => void) {
        this.router.get(route.path, async (request, response) => {
            return this.routeHandler(route, request, response, callback);
        });
    }

    public routePost(route: RouteInformation, callback: (request: Request, response: Response) => void) {
        this.router.post(route.path, async (request, response) => {
            return this.routeHandler(route, request, response, callback);
        });
    }
    public routePut(route: RouteInformation, callback: (request: Request, response: Response) => void) {
        this.router.put(route.path, async (request, response) => {
            return this.routeHandler(route, request, response, callback);
        });
    }
    public routeDelete(route: RouteInformation, callback: (request: Request, response: Response) => void) {
        this.router.delete(route.path, async (request, response) => {
            return this.routeHandler(route, request, response, callback);
        });
    }

    protected async routeHandler(route: RouteInformation, request: Request, response: Response, callback: (request: Request, response: Response) => void) {
        try {
            this.logRequest(request);
            return callback(request, response);
        } catch (e) {
            handleError(e, response);
        }
    }

    public removeRoute(path: string) {
        this.router.stack = this.router.stack.filter(x => x['route']['path'] !== path);
    }

    private logRequest(request: Request) {
        LogService.log(LogType.Server, `${request.method} ${request.path} ${Object.keys(request.body).length > 0 ? "\nbody: " + JSON.stringify(request.body, null, 4) : ""}`);
    }
}
