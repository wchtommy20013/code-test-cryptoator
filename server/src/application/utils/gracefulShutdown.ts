import * as http from 'http';
import express = require('express');
import { EventManager } from '../event/EventManager';
import { LogService } from '@server/entity/log/service/LogService';
import { LogType } from '@server/entity/log/model/LogType';


const defaultForceTimeout = 30000;

interface GracefulShutdownOptions {
    forceTimeout?: number;
}

export const createGracefulShutdownMiddleware = (server: http.Server, options: GracefulShutdownOptions = {}) => {
    let shuttingDown = false;
    options.forceTimeout = options.forceTimeout || defaultForceTimeout;

    const gracefulExit = () => {
        // if (!process.env.NODE_ENV) return process.exit(1)    // Skip during dev
        if (shuttingDown) {
            return;
        }
        shuttingDown = true;
        LogService.log(LogType.Server, 'Received kill signal (SIGTERM), shutting down');

        setTimeout(() => {
            EventManager.emit("SERVER_STOPPED");
            LogService.error(LogType.Server, 'Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, options.forceTimeout);

        server.close(() => {
            EventManager.emit("SERVER_STOPPED");
            LogService.log(LogType.Server, 'Closed out remaining connections.');
            process.exit();
        });
    }

    process.on('SIGTERM', gracefulExit);
    process.on('SIGINT', gracefulExit);

    return (req: any, res: any, next: any) => {
        if (!shuttingDown) {
            return next();
        }
        res.set('Connection', 'close');
        res.status(503).send('Server is in the process of restarting.');
    }
}
