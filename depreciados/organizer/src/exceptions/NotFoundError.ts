import { httpStatusCodes } from "../constants";
import { FieldError } from "../interfaces/interfaces";
import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    constructor (
        name = 'Recurso não encontrado',
        statusCode = httpStatusCodes.NOT_FOUND,
        description = 'O recurso desejado não foi encontrado',
        ) {
        super(name, statusCode, description);
    }
}