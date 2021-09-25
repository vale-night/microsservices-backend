export interface IBaseError extends Error {
    name: string;
    statusCode: number;
    description: string
}
export class BaseError extends Error implements IBaseError {
    name: string;
    statusCode: number;
    description: string
    constructor(name: string, statusCode: number, description: string) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name
        this.statusCode = statusCode;
        // Error.captureStackTrace(this);
    }
}