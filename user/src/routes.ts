import express = require('express');
import { InternalServerError } from './exceptions/InternalServerError';
import { NotFoundError } from './exceptions/NotFoundError';
import { User } from './models/UserModel';

import { deleteUser, getUser, saveUser } from './service';
const routes = express.Router();

routes.get('/:id', async (req, res, next) => {
    try {
        const user = await getUser(req.params.id);
        if (!user)
            throw new NotFoundError('Organizador não encontrado');
        res.send(user);
    } catch (error) {
        next(error);
    }
});

routes.post('', async (req, res, next) => {
    try {
        res.send(await saveUser(req.body as User));
    } catch (error) {
        next(error);
    }
});

routes.delete('/:id', async (req, res, next) => {
    try {
        res.send(await deleteUser(req.params.id));
    } catch (error) {
        next(error);
    }
})

export default routes;