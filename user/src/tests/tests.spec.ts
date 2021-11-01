import { expect } from 'chai';
import 'mocha';
import { ObjectId } from 'mongoose';
import { initDb } from '../db';
import { ValidationError } from '../exceptions/ValidationError';
import { FieldError } from '../interfaces/interfaces';
import { User } from '../models/UserModel';
import { deleteUser, getUser, saveUser } from '../services/service';

let mongooseConnection: typeof import('mongoose');
let userId: ObjectId;
describe('Testes de Usuários', () => {
    before(async () => {
        mongooseConnection = await initDb();
    }),

    it('Salvar Usuário válido deverá retornar uma entidade válida com ObjectID definido e válido', async () => {
        const user: User = {
            email: `${+new Date()}@valenight.com`,
            password: `senha`,
            type: 'CLIENT',
            roles: []
        }
        const result = await saveUser(user);
        expect(result).to.not.be.null;
        expect(result).to.have.property('id');
        expect(mongooseConnection.isValidObjectId(result.id)).to.be.true;
        userId = result.id;
    });

    //TODO - Melhorar tratativa de exceções
    // it('Salvar Usuário inválido deverá retornar um erro', async () => {
    //     const user: User = {
    //         name: ``,
    //         cpf: '1111111111'
    //     };
    //     expect(await saveUser(user)).to.throw(Error);
    // });

    it('Recuperar Usuário existente pelo ID deverá retornar uma entidade válida', async () => {
        const result = await getUser(userId.toString());
        expect(result).to.not.be.null;
        expect(result).to.have.property('id');
        expect(result.id).to.be.equals(userId);
    });

    it('Deletar Usuário pelo ID deverar excluí-lo logicamente do banco', async () => {
        const deleteResult = await deleteUser(userId.toString());
        expect(deleteResult).to.be.true;
        const getResult = await getUser(userId.toString());
        expect(getResult).to.be.null;
    });
});
