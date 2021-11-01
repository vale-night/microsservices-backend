import { InternalServerError } from "../exceptions/InternalServerError";
import { ValidationError } from "../exceptions/ValidationError";
import { FieldError } from "../interfaces/interfaces";
import { User, UserModel } from "../models/UserModel";
import bcrypt = require('bcrypt');
import { validateCNPJ, validateCPF } from "../utils/validators";
import { CLIENT_USER_ROLES, ORGANIZER_USER_ROLES } from "../roles/roles";

export const saveUser = async (user: User, validate?: (user: User, errors: Array<FieldError>) => void) => {
    try {
        const errors = validateUser(user);
        if (validate)
            validate(user, errors);

        if (errors.length > 0)
            throw new ValidationError(errors);
        user.password = await generateBcryptHash(user.password);
        const savedUser = await UserModel.create(user);
        return savedUser;
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error);
    }
}

export const getUser = async (id: string) => {
    try {
        return await UserModel.findOne({ _id: id, active: true });
    } catch (error) {
        throw new InternalServerError(error);
    }
}

export const deleteUser = async (id: string) => {
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
    return errors;
}