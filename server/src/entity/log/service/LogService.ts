import { BaseService } from "@server/common/service/BaseService";
import { ILogService } from "./ILogService";

class Service extends BaseService {
    public async log(type: string, message: string): Promise<void> {
        if (process.env.NODE_ENV === 'unit-test') {
            return;
        }
        console.log(`(${new Date().toLocaleString()}) [${type}] ${message}`);
    }

    public async error(type: string, message: string): Promise<void> {
        if (process.env.NODE_ENV === 'unit-test') {
            return;
        }
        console.error(`(${new Date().toLocaleString()}) [${type}] ${message}`);
    }
}

export const LogService: ILogService = new Service();
