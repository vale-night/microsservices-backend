import { httpStatusCodes } from "../interfaces/constants";
import { BaseError } from "./BaseError";

export class ForbiddenError extends BaseError {
    constructor (
        name = 'Usuário sem acesso ao recurso solicitado',
        statusCode = httpStatusCodes.FORBIDDEN,
        description = 'Usuário sem acesso ao recurso solicitado',
        ) {
        super(name, statusCode, description);
    }
}