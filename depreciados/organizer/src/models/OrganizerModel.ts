import { Schema, model } from 'mongoose';

export interface Organizer {
    name: string;
    email?: string;
    password?: string;
    cpf: string;
    fantasyName?: string;
    cnpj?: string;
    socialReason?: string;
    rg?: string;
    birthDate?: Date;
    active?: boolean;
    userId?: string;
}

const schema = new Schema<Organizer>({
    name: { type: String, required: true },
    cpf: { type: String, required: false },
    fantasyName: { type: String, required: false },
    cnpj: { type: String, required: false },
    socialReason: { type: String, required: false },
    rg: { type: String, required: false },
    birthDate: { type: Date, required: false },
    userId: {type: String, required: false},
    active: { type: Boolean, required: true, default: true }
});

export const OrganizerModel = model<Organizer>('organizer', schema, 'organizers');