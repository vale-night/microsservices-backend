import express = require('express');
import { NotFoundError } from '../exceptions/NotFoundError';
import { handleAuth, hasPermission } from '../middlewares/middlewares';
import { User } from '../models/UserModel';

import { deleteUser, getUser, saveUser, updateUser, validateAsClient, validateAsOrganizer } from '../services/service';
const routes = express.Router();

/**
 * @swagger
 *  /{id}:
 *      get:
 *          description: Retorna os dados do usuário com o ID especificado. 
 *          consumes:
 *              - "application/json"
 *          produces:
 *              - "application/json"
 *          parameters:
 *          - in: path
 *            name: "id"
 *            description: "ID do usuário"
 *            schema:
 *               type: "integer"
 *            required: true
 *          responses:
 *              200:
 *                  description: Usuário recuperado.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/User'
 */
routes.get('/:id', hasPermission(['READ_SELF', 'READ_MANY']), async (req, res, next) => {
    try {
        const user = await getUser(req.params.id, req.header('Authorization')?.split(' ')[1]);
        if (!user)
            throw new NotFoundError('Usuário não encontrado');
        res.send(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 *  /{id}:
 *      put:
 *          description: Atualiza os dados do usuário com o ID especificado. 
 *          consumes:
 *              - "application/json"
 *          produces:
 *              - "application/json"
 *          parameters:
 *          - in: path
 *            name: "id"
 *            description: "ID do usuário"
 *            schema:
 *               type: "integer"
 *            required: true
 *          - in: body
 *            name: "user"
 *            description: "Dados do usuário"
 *            schema:
 *               $ref: '#/definitions/User'
 *          responses:
 *              200:
 *                  description: Informações salvas do usuário.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/User'
 */
 routes.put('/:id', hasPermission(['UPDATE_SELF', 'UPDATE_MANY']), async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        req.body.id = req.params.id;
        const user = await updateUser(req.body as User, token);
        if (!user)
            throw new NotFoundError('Usuário não encontrado');
        res.send(user);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 *  /:
 *      post:
 *          description: Salva um novo usuário
 *          consumes:
 *              - "application/json"
 *          produces:
 *              - "application/json"
 *          parameters:
 *          - in: body
 *            name: "user"
 *            description: "Dados do usuário"
 *            schema:
 *               $ref: '#/definitions/User'
 *          responses:
 *              200:
 *                  description: Usuário salvo no banco de dados
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/User'
 */
routes.post('', async (req, res, next) => {
    try {
        const user = req.body as User;
        res.send(await saveUser(user));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 *  /{id}:
 *      delete:
 *          description: Deleta um usuário com o ID especificado
 *          consumes:
 *              - "application/json"
 *          produces:
 *              - "application/json"
 *          parameters:
 *          - in: path
 *            name: "id"
 *            description: "ID do usuário"
 *            schema:
 *               type: "integer"
 *            required: true
 *          responses:
 *              200:
 *                  description: Booleano indicando se a deleção foi concluída ou não.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: boolean
 */
routes.delete('/:id', hasPermission(['DELETE_SELF', 'DELETE_MANY']),async (req, res, next) => {
    try {
        res.send(await deleteUser(req.params.id, req.header('Authorization')?.split(' ')[1]));
    } catch (error) {
        next(error);
    }
})

export default routes;