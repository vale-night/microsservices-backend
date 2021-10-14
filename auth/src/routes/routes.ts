import express = require('express');
import { NotFoundError } from '../exceptions/NotFoundError';

import { authenticateUser, isValidJwt } from '../services/service';
const routes = express.Router();

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

routes.post('/verifyToken', async (req, res, next) => {
    try {
        const token = req.body.token;
        res.send(isValidJwt(token));
    } catch (error) {
        next(error);
    }
});

export default routes;