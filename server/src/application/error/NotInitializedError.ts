export class NotInitializedError extends Error {
    constructor(public serviceName: string) {
        super();
        this.message = `${serviceName} not initialized`;
        Object.setPrototypeOf(this, NotInitializedError.prototype);
    }
}
