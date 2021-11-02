import { Schema, model, ObjectId } from 'mongoose';
import { CLIENT_USER_ROLES, Role } from '../roles/roles';

/**
 * @swagger
 *  definitions:
 *   User:
 *       type: object
 *       properties:
 *           id:
 *               type: string
 *           email: 
 *               type: string
 *               required: true
 *           password:
 *               type: string
 *               required: true
 *           type:
 *               type: string
 *               required: true
 *               enum: [CLIENT, ORGANIZER]
 *           name:
 *               type: string
 *           cpf:
 *               type: string
 *           fantasyName:
 *               type: string
 *           cnpj:
 *               type: string
 *           socialReason:
 *               type: string
 *           rg:
 *               type: string
 *           birthDate:
 *               type: string
 *           active:
 *               type: boolean
 *           roles:
 *              type: array
 *              items:
 *                  $ref: '#definitions/Role'
 *   Role:
 *      type: object
 *      properties:
 *          resources:
 *              type: string
 *              enum: [FILES, EVENTS, USERS]
 *          permissions:
 *              type: array
 *              items:
 *                  type: string
 *                  enum: [READ_SELF,READ_MANY,INSERT,UPDATE_SELF,UPDATE_MANY,DELETE_SELF,DELETE_MANY]
 */
export interface User {
    _id?: ObjectId | string,
    id?: string;
    email: string;
    password: string;
    username?: string;
    type: UserType;
    name?: string;
    cpf?: string;
    fantasyName?: string;
    cnpj?: string;
    socialReason?: string;
    rg?: string;
    birthDate?: Date;
    active?: boolean;
    roles?: Array<Role>
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
    roles: {type: [], required: true, default: CLIENT_USER_ROLES},
    active: { type: Boolean, required: true, default: true }
});

export const UserModel = model<User>('user', schema, 'users');