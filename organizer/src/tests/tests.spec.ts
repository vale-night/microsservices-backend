import { expect } from 'chai';
import 'mocha';
import { ObjectId } from 'mongoose';
import { initDb } from '../db';
import { ValidationError } from '../exceptions/ValidationError';
import { FieldError } from '../interfaces';
import { Organizer } from '../models/OrganizerModel';
import { deleteOrganizer, getOrganizer, saveOrganizer } from '../service';

let mongooseConnection: typeof import('mongoose');
let organizerId: ObjectId;
describe('Testes de Organizadores', () => {
    before(async () => {
        mongooseConnection = await initDb();
    }),

        it('Salvar Organizador válido deverá retornar uma entidade válida com ObjectID definido e válido', async () => {
            const organizer: Organizer = {
                name: `Organizador para Testes ${+new Date()}`,
                email: `${+new Date()}@valenight.com`,
                password: `teste123`,
                cpf: '76390665067',
                socialReason: `Razão Social Teste ${+new Date()}`,
                fantasyName: `Nome Fantasia Teste ${+new Date()}`,
                cnpj: '95893309000164',
                birthDate: new Date()
            }
            const result = await saveOrganizer(organizer);
            expect(result).to.not.be.null;
            expect(result).to.have.property('id');
            expect(mongooseConnection.isValidObjectId(result.id)).to.be.true;
            organizerId = result.id;
        });
    
    //TODO - Melhorar tratativa de exceções
    // it('Salvar Organizador inválido deverá retornar um erro', async () => {
    //     const organizer: Organizer = {
    //         name: ``,
    //         cpf: '1111111111'
    //     };
    //     expect(await saveOrganizer(organizer)).to.throw(Error);
    // });

    it('Recuperar Organizador existente pelo ID deverá retornar uma entidade válida', async () => {
        const result = await getOrganizer(organizerId.toString());
        expect(result).to.not.be.null;
        expect(result).to.have.property('id');
        expect(result.id).to.be.equals(organizerId);
    });

    it('Deletar Organizador pelo ID deverar excluí-lo logicamente do banco', async () => {
        const deleteResult = await deleteOrganizer(organizerId.toString());
        expect(deleteResult).to.be.true;
        const getResult = await getOrganizer(organizerId.toString());
        expect(getResult).to.be.null;
    });
});
