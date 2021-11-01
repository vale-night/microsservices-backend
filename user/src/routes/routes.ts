import express = require('express');
import { NotFoundError } from '../exceptions/NotFoundError';
import { handleAuth, hasPermission } from '../middlewares/middlewares';
import { User } from '../models/UserModel';

import { deleteUser, getUser, saveUser, validateAsClient, validateAsOrganizer } from '../services/service';
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
 *                  description: Objeto contendo o resultado da autenticação e o token.
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
 *  /:
 *      post:
 *          description: Salva um novo usuário
 *          consumes:
 *              - "application/json"
 *          produces:
 *              - "application/json"
 *          parameters:
 *          - in: body
 *            name: "id"
 *            description: "ID do usuário"
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
        const validateFunction = user.type === 'CLIENT' ?
            validateAsClient : validateAsOrganizer;
        res.send(await saveUser(user, validateFunction));
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