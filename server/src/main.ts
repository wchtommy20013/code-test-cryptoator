import { EventManager } from './application/event/EventManager';
import { LogType } from '@server/entity/log/model/LogType';
import { LogService } from '@server/entity/log/service/LogService';

const registerEvents = () => {
    EventManager.register("ERROR_UNCAUGHT", ({ err }) => {
        LogService.error(LogType.Server, `Uncaught Exception: ${err.message}`);
    });

    EventManager.register("ERROR_UNCAUGHT_REJECT", ({ reason, promise }) => {
        LogService.error(LogType.Server, `Unhandled rejection at ${promise} reason: ${reason}`);
    });

    process.on('uncaughtException', err => {
        EventManager.emit("ERROR_UNCAUGHT", { err });
    });

    process.on('unhandledRejection', (reason, promise) => {
        EventManager.emit("ERROR_UNCAUGHT_REJECT", { reason, promise });
    });
}

registerEvents();

const context = require("@server/context");
context.start();
