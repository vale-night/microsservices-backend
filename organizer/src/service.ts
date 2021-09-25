import { InternalServerError } from "./exceptions/InternalServerError";
import { ValidationError } from "./exceptions/ValidationError";
import { FieldError } from "./interfaces";
import { Organizer, OrganizerModel } from "./models/OrganizerModel";
import { validateCNPJ, validateCPF } from "./validators";

export const saveOrganizer = async (organizer: Organizer) => {
    try {
        const errors = validateOrganizer(organizer);
        if(errors.length > 0)
            throw new ValidationError(errors);
        const organizerToSave = new OrganizerModel(organizer);
        return await organizerToSave.save();
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