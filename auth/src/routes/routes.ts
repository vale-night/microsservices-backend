import express = require('express');
import { NotFoundError } from '../exceptions/NotFoundError';

import { authenticateUser, isValidJwt } from '../services/service';
const routes = express.Router();

/**
 * @swagger
 *  /login:
 *      post:
 *          description: Autentica o usuário, gerando um token JWT que pode ser utilizado ao consumir outros serviços
 *          consumes:
 *              - "application/json"
 *          produces:
 *              - "application/json"
 *          parameters:
 *          - in: body
 *            name: "body"
 *            description: "Objeto contendo as credenciais de acesso do usuario"
 *            schema:
 *               type: "object"
 *               properties:
 *                   username:
 *                     type: "string"
 *                   password:
 *                     type: "string"
 *          responses:
 *              200:
 *                  description: Objeto contendo o resultado da autenticação e o token.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  auth:
 *                                      type: boolean
 *                                  accessToken:
 *                                      type: string
 */
routes.post('/login', async (req, res, next) => {
    try {
        const user = req.body;
        const token = await authenticateUser(user);
        if(!token)
            throw new NotFoundError('', 404, 'Pendente definir tratamento de exceções');
        res.send({
            auth: true,
            accessToken: token
        });
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 *  /verifyToken:
 *      post:
 *          description: Verifica a validade de um token JWT
 *          consumes:
 *              - "application/json"
 *          produces:
 *              - "application/json"
 *          parameters:
 *          - in: body
 *            name: "body"
 *            description: "Objeto contendo o token que será validado"
 *            schema:
 *               type: "object"
 *               properties:
 *                   token:
 *                     type: "string"
 *          responses:
 *              200:
 *                  description: Objeto contendo o resultado da autenticação e o token.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: boolean
 */
routes.post('/verifyToken', async (req, res, next) => {
    try {
        const token = req.body.token;
        res.send(isValidJwt(token));
    } catch (error) {
        next(error);
    }
});

export default routes;