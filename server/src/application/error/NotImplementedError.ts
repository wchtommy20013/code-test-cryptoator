export class NotImplementedError extends Error {
    constructor() {
        super();
        this.message = "Not Implemented";
        Object.setPrototypeOf(this, NotImplementedError.prototype);
    }
}
