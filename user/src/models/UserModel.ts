import { Schema, model } from 'mongoose';

/**
 * @swagger
 * definitions:
 *  User:
 *      type: object
 *      properties:
 *          id:
 *              type: string
 *          email: 
 *              type: string
 *              required: true
 *          password:
 *              type: string
 *              required: true
 *          type:
 *              type: string
 *              required: true
 *              enum: [CLIENT, ORGANIZER]
 *          name:
 *              required: true
 *              type: string
 *          cpf:
 *              type: string
 *          fantasyName:
 *              type: string
 *          cnpj:
 *              type: string
 *          socialReason:
 *              type: string
 *          rg:
 *              type: string
 *          birthDate:
 *              type: string
 *          active:
 *              type: boolean
 */
export interface User {
    email: string;
    password: string;
    type: UserType;
    name?: string;
    cpf?: string;
    fantasyName?: string;
    cnpj?: string;
    socialReason?: string;
    rg?: string;
    birthDate?: Date;
    active?: boolean;
}

export type UserType = 'CLIENT' | 'ORGANIZER';

export const USER_TYPES = {
    'CLIENT': {
        nomeAmigavel: 'Cliente'
    },
    'ORGANIZER': {
        nomeAmigavel: 'Organizador'
    }
}

const schema = new Schema<User>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    cpf: { type: String, required: false },
    fantasyName: { type: String, required: false },
    cnpj: { type: String, required: false },
    socialReason: { type: String, required: false },
    rg: { type: String, required: false },
    birthDate: { type: Date, required: false },
    active: { type: Boolean, required: true, default: true }
});

export const UserModel = model<User>('user', schema, 'users');