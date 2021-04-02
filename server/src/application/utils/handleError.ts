import { LogType } from "@server/entity/log/model/LogType";
import { LogService } from "@server/entity/log/service/LogService";
import { Response } from "express";
import { HttpRequestError } from "../error/HttpRequestError";

export const handleError = (e: Error, response: Response) => {
    LogService.log(LogType.Error, JSON.stringify(e, null, 4));
    if (e instanceof HttpRequestError) {
        return response.status(e.status).send(e.message);
    } else {
        if (e.message) {
            return response.status(400).send(e.message);
        } else {
            return response.status(400).send(e);
        }
    }
}
