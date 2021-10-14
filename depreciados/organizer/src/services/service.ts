import { InternalServerError } from "../exceptions/InternalServerError";
import { ValidationError } from "../exceptions/ValidationError";
import { invokeService } from "./gatewayCommunication";
import { FieldError } from "../interfaces/interfaces";
import { Organizer, OrganizerModel } from "../models/OrganizerModel";
import { validateCNPJ, validateCPF } from "../util/validators";

export const saveOrganizer = async (organizer: Organizer) => {
    try {
        const errors = validateOrganizer(organizer);
        if(errors.length > 0)
            throw new ValidationError(errors);
        const userToSave = {
            email: organizer.email,
            password: organizer.password
        }
        const user = await invokeService('USER', userToSave, true) as any;
        organizer.userId = user._id;
        const organizerToSave = await OrganizerModel.create(organizer);
        return organizerToSave;
    } catch (error) {
        throw new InternalServerError(error);
    }
}

export const getOrganizer = async (id: string) => {
    try {
        return await OrganizerModel.findOne({_id: id, active: true});
    } catch (error) {
        throw new InternalServerError(error);
    }
}

export const deleteOrganizer = async (id: string) => {
    try {
        const result = await OrganizerModel.findOneAndUpdate({_id: id}, {
            name: 'Organizador Deletado',
            cpf: null,
            active: false
        }, {new: true}).exec();
        return !result.active;
    } catch (error) {
        throw new InternalServerError(error);
    }
}

function validateOrganizer(organizer: Organizer) {
    const errors: Array<FieldError> = [];
    if(!organizer.name) {
        errors.push({
            message: 'O nome é obrigatório!'
        });
    }
    if(!validateCPF(organizer.cpf)) {
        errors.push({
            message: `O CPF ${organizer.cpf} é inválido`
        });
    }

    if(!validateCNPJ(organizer.cnpj)) {
        errors.push({
            message: `O CNPJ ${organizer.cnpj} é inválido`
        });
    }
    return errors;
}