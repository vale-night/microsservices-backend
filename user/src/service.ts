import { InternalServerError } from "./exceptions/InternalServerError";
import { ValidationError } from "./exceptions/ValidationError";
import { FieldError } from "./interfaces";
import { User, UserModel } from "./models/UserModel";
import bcrypt = require('bcrypt');

export const saveUser = async (user: User) => {
    try {
        const errors = validateUser(user);
        if(errors.length > 0)
            throw new ValidationError(errors);
        user.password = await generateBcryptHash(user.password);
        const userToSave = new UserModel(user);
        return await userToSave.save();
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error);
    }
}

export const getUser = async (id: string) => {
    try {
        return await UserModel.findOne({_id: id, active: true});
    } catch (error) {
        throw new InternalServerError(error);
    }
}

export const deleteUser = async (id: string) => {
    try {
        const result = await UserModel.findOneAndUpdate({_id: id}, {
            name: 'Usuário Deletado',
            cpf: null,
            active: false
        }, {new: true}).exec();
        return !result.active;
    } catch (error) {
        throw new InternalServerError(error);
    }
}

const generateBcryptHash = async (password: string) => {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

function validateUser(user: User) {
    const errors: Array<FieldError> = [];
    if(!user.email) {
        errors.push({
            message: 'O email é obrigatório!'
        });
    }
    if(!user.password) {
        errors.push({
            message: 'A senha é obrigatória!'
        });
    }
    return errors;
}