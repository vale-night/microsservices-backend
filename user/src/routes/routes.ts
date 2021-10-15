import express = require('express');
import { NotFoundError } from '../exceptions/NotFoundError';
import { handleAuth } from '../middlewares/middlewares';
import { User } from '../models/UserModel';

import { deleteUser, getUser, saveUser, validateAsClient, validateAsOrganizer } from '../services/service';
const routes = express.Router();

routes.get('/:id', handleAuth, async (req, res, next) => {
    try {
        const user = await getUser(req.params.id);
        if (!user)
            throw new NotFoundError('Usuário não encontrado');
        res.send(user);
    } catch (error) {
        next(error);
    }
});

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

routes.delete('/:id', handleAuth,async (req, res, next) => {
    try {
        res.send(await deleteUser(req.params.id));
    } catch (error) {
        next(error);
    }
})

export default routes;