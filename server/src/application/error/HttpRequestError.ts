export class HttpRequestError extends Error {
    constructor(public status: number, public message: string, public innerError?: Error) {
        super();
        Object.setPrototypeOf(this, HttpRequestError.prototype);
    }
}
