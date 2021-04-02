import { EventEmitter } from "events";
import { EventType, EventByType } from "./EventType";


class Manager {
    private eventEmitter: EventEmitter;
    public constructor() {
        this.eventEmitter = new EventEmitter();
        this.eventEmitter.setMaxListeners(Infinity);
    }

    public register<T extends EventType>(event: T, listener: (args: EventByType[T]) => void) {
        this.eventEmitter.addListener(event, listener);
    }

    public emit<T extends EventType>(eventType: T, args?: EventByType[T]) {
        this.eventEmitter.emit(eventType, args);
    }
}

export const EventManager = new Manager();
