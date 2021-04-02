export interface ILogService {
    log(type: string, message: string): Promise<void>;
    error(type: string, message: string): Promise<void>;
}
