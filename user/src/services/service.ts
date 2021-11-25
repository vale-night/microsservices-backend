import { InternalServerError } from "../exceptions/InternalServerError";
import { ValidationError } from "../exceptions/ValidationError";
import { FieldError } from "../interfaces/interfaces";
import { User, UserModel } from "../models/UserModel";
import bcrypt = require('bcryptjs');
import { validateCNPJ, validateCPF } from "../utils/validators";
import { CLIENT_USER_ROLES, ORGANIZER_USER_ROLES } from "../roles/roles";
import { decodeToken, tokenHasAnyPermission } from "../middlewares/middlewares";
import { ForbiddenError } from "../exceptions/ForbiddenError";
import { NotFoundError } from "../exceptions/NotFoundError";

export const saveUser = async (user: User) => {
    try {
        const errors = validateUser(user);

        if (errors.length > 0)
            throw new ValidationError(errors);
        assignRoles(user);
        user.password = await generateBcryptHash(user.password);
        const savedUser = await UserModel.create(user);
        return savedUser;
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error);
    }
}

export const updateUser = async (params: User, token?: string) => {
    if(token) {
        const loggedUser = decodeToken(token);
        if(params.id !== loggedUser.id) {
            if(!tokenHasAnyPermission(token, ['UPDATE_MANY'])) {
                throw new ForbiddenError('Usuário sem acesso ao recurso desejado');
            }
        }
    }
    const userFromDb = await UserModel.findById(params.id);
    if(!userFromDb)
        throw new NotFoundError('Usuário não encontrado');
    
    const fieldsToUpdate: User = {} as User;
    for (const key in params) {
        if(key === 'id' || key === '_id' || key === 'password' || key === 'TYPE')
            continue;
        if(params[key] !== userFromDb[key])
            fieldsToUpdate[key] = params[key];    
    }
    let userToUpdate = await UserModel.findByIdAndUpdate(params.id, fieldsToUpdate);
    console.log(userToUpdate);
    return userToUpdate;
}

export const getUser = async (id: string, token?: string) => {
    if(token) {
        const loggedUser = decodeToken(token);
        if(id !== loggedUser.id) {
            if(!tokenHasAnyPermission(token, ['READ_MANY'])) {
                throw new ForbiddenError('Usuário sem acesso ao recurso desejado');
            }
        }
    }
    try {
        return await UserModel.findOne({ _id: id, active: true });
    } catch (error) {
        throw new InternalServerError(error);
    }
}

export const deleteUser = async (id: string, token?: string) => {
    if(token) {
        const loggedUser = decodeToken(token);
        if(id !== loggedUser.id) {
            if(!tokenHasAnyPermission(token, ['READ_MANY'])) {
                throw new ForbiddenError('Usuário sem acesso ao recurso desejado');
            }
        }
    }
    try {
        const result = await UserModel.findOneAndUpdate({ _id: id }, {
            name: 'Usuário Deletado',
            cpf: null,
            active: false
        }, { new: true }).exec();
        return !result.active;
    } catch (error) {
        throw new InternalServerError(error);
    }
}

//TODO - Adicionar validações específicas de cliente
export const validateAsClient = (user: User, errors: Array<FieldError>) => {
    if (!errors)
        errors = [];

}

export const validateAsOrganizer = (user: User, errors: Array<FieldError>) => {
    if (!errors)
        errors = [];
    if (!validateCPF(user.cpf)) {
        errors.push({
            message: 'CPF inválido ou não informado!'
        });
    }
    if(!validateCNPJ(user.cnpj)) {
        errors.push({
            message: 'CNPJ inválido ou não informado!'
        })
    }
}

const assignRoles = (user: User) => {
    if(user.type === 'CLIENT')
        user.roles = CLIENT_USER_ROLES;
    else if (user.type === 'ORGANIZER')
        user.roles = ORGANIZER_USER_ROLES;
}

const generateBcryptHash = async (password: string) => {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

function validateUser(user: User) {
    const errors: Array<FieldError> = [];
    if(!user.name) {
        errors.push({
            message: 'O nome é obrigatório!'
        });
    }
    if (!user.email) {
        errors.push({
            message: 'O email é obrigatório!'
        });
    }
    if (!user.password) {
        errors.push({
            message: 'A senha é obrigatória!'
        });
    }
    if(user.type === 'CLIENT') {
        validateAsClient(user, errors);
    } else if (user.type === 'ORGANIZER') {
        validateAsOrganizer(user, errors);
    }
    return errors;
}