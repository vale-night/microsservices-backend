import { Schema, model } from 'mongoose';

export interface User {
    email: string;
    username?: string;
    password?: string;
    active?: boolean;
}

const schema = new Schema<User>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, required: true, default: true }
});

export const UserModel = model<User>('user', schema, 'users');