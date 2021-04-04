import { ApplicationContext } from "./application/ApplicationContext";
import { applyRoute } from "./application/decorators/Route";
import { EventManager } from "./application/event/EventManager";
import { AppConfig } from "./common/config/AppConfig";
import { controllers } from "./controller";


const context = new ApplicationContext({
    httpPort: parseInt(AppConfig.environment.port) || 4000,
    serviceIP: AppConfig.environment.address,
    key: AppConfig.environment.key,
});

module.exports = {
    context,
    app: context.app,
    start: async () => {
        if (process.env.NODE_ENV === 'development') {
            const swaggerUi = require('swagger-ui-express');
            const swaggerDocument = require('../docs/swagger.json');
            context.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        }

        context.init();

        EventManager.emit("SHOULD_REFRESH");
        setInterval(() => {
            EventManager.emit("SHOULD_REFRESH");
        }, AppConfig.throttleTimeLimitSecond * 1000 + 1000); // an extra second for buffering

        applyRoute(controllers, context);
        EventManager.emit("SERVER_STARTED");
    },
    end: () => {
        context.server.close();
    }
}

