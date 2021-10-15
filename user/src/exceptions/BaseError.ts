export interface IBaseError extends Error {
    name: string;
    statusCode: number;
    description: string
}

//TODO - Provavelmente o API Gateway irá tratar isso, então, essa classe poderá ser descontinuada
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