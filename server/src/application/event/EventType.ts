export type EventType = keyof EventByType;

export interface EventByType {
    SERVER_STARTED: {},
    SERVER_STOPPED: {},

    ERROR_UNCAUGHT: {
        err: Error
    },
    ERROR_UNCAUGHT_REJECT: {
        reason: {} | null | undefined, 
        promise: Promise<any>
    }
}
