import { ValidationError } from "./exceptions/ValidationError";
import { invokeService } from "./gatewayCommunication";
import { FieldError } from "./interfaces";
import { Client, ClientModel } from "./models/ClientModel";
import { validateCPF } from "./validators";

export const saveClient = async (client: Client) => {
    try {
        const errors = validateClient(client);
        if(errors.length > 0)
            throw new ValidationError(errors);
            const userToSave = {
                email: client.email,
                password: client.password
            }
            const user = await invokeService('USER', userToSave, true) as any;
            client.userId = user._id;
            const clientToSave = await ClientModel.create(client);
            return clientToSave;
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