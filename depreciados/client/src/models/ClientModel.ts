import { Schema, model } from 'mongoose';

export interface Client {
    name: string;
    cpf: string;
    email?: string;
    password?: string;
    active?: boolean;
    userId?: string;
}

const schema = new Schema<Client>({
    name: { type: String, required: true },
    cpf: { type: String, required: false },
    userId: { type: String, required: false },
    active: { type: Boolean, required: true, default: true }
});

export const ClientModel = model<Client>('client', schema);