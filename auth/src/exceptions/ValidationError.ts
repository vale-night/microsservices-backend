import { httpStatusCodes } from "../interfaces/constants";
import { FieldError } from "../interfaces/interfaces";
import { BaseError } from "./BaseError";

export class ValidationError extends BaseError {
    errors: Array<FieldError>;
    constructor (
        errors: Array<FieldError>,
        name = 'Erro de validação',
        statusCode = httpStatusCodes.BAD_REQUEST,
        description = 'Ocorreram erros de validação',
        ) {
        super(name, statusCode, description);
        this.errors = errors;
    }
}