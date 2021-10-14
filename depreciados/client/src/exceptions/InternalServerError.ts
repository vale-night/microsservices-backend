import { httpStatusCodes } from "../constants";
import { BaseError } from "./BaseError";

export class InternalServerError extends BaseError {
    error: Error;
    constructor (
        error: Error,
        name = 'Ocorreu um erro inesperado',
        statusCode = httpStatusCodes.INTERNAL_SERVER,
        description = 'Ocorreu um erro inesperado',
        ) {
        super(name, statusCode, description);
        this.error = error;
    }
}