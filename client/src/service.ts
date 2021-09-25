import { ValidationError } from "./exceptions/ValidationError";
import { FieldError } from "./interfaces";
import { Client, ClientModel } from "./models/ClientModel";
import { validateCPF } from "./validators";

export const saveClient = async (client: Client) => {
    try {
        const errors = validateClient(client);
        if(errors.length > 0)
            throw new ValidationError(errors);
        const clientToSave = new ClientModel(client);
        return await clientToSave.save();
    } catch (error) {
        throw error;
    }
}

export const getClient = async (id: string) => {
    try {
        return await ClientModel.findOne({_id: id, active: true});
    } catch (error) {
        throw error;
    }
}

export const deleteClient = async (id: string) => {
    try {
        const result = await ClientModel.findByIdAndUpdate(id, {
            name: 'Usuário Deletado',
            cpf: null,
            active: false
        }, {new: true});
        return !result.active;
    } catch (error) {
        throw error;
    }
}

function validateClient(client: Client) {
    const errors: Array<FieldError> = [];
    if(!client.name) {
        errors.push({
            message: 'O nome é obrigatório!'
        })
    }
    if(!validateCPF(client.cpf)) {
        errors.push({
            message: `O CPF ${client.cpf} é inválido`
        })
    }
    return errors;
}