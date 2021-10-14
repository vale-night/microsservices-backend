import { expect } from 'chai';
import 'mocha';
import { ObjectId } from 'mongoose';
import { initDb } from '../db';
import { ValidationError } from '../exceptions/ValidationError';
import { FieldError } from '../interfaces';
import { Client } from '../models/ClientModel';
import { deleteClient, getClient, saveClient } from '../service';

let mongooseConnection: typeof import('mongoose');
let clientId: ObjectId;
describe('Testes de Clientes', () => {
    before(async () => {
        mongooseConnection = await initDb();
    }),

        it('Salvar cliente válido deverá retornar uma entidade válida com ObjectID definido e válido', async () => {
            const client: Client = {
                name: `Cliente para Testes ${+new Date()}`,
                cpf: '76390665067',
                email: `${+new Date()}@valenight.com`,
                password: `teste123`,
            }
            const result = await saveClient(client);
            expect(result).to.not.be.null;
            expect(result).to.have.property('id');
            expect(mongooseConnection.isValidObjectId(result.id)).to.be.true;
            clientId = result.id;
        });
    
    //TODO - Melhorar tratativa de exceções
    // it('Salvar cliente inválido deverá retornar um erro', async () => {
    //     const client: Client = {
    //         name: ``,
    //         cpf: '1111111111'
    //     };
    //     expect(await saveClient(client)).to.throw(Error);
    // });

    it('Recuperar cliente existente pelo ID deverá retornar uma entidade válida', async () => {
        const result = await getClient(clientId.toString());
        expect(result).to.not.be.null;
        expect(result).to.have.property('id');
        expect(result.id).to.be.equals(clientId);
    });

    it('Deletar cliente pelo ID deverar excluí-lo logicamente do banco', async () => {
        const deleteResult = await deleteClient(clientId.toString());
        expect(deleteResult).to.be.true;
        const getResult = await getClient(clientId.toString());
        expect(getResult).to.be.null;
    });
});
