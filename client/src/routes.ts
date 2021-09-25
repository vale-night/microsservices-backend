import express = require('express');
import { NotFoundError } from './exceptions/NotFoundError';
import { Client } from './models/ClientModel';

import { deleteClient, getClient, saveClient } from './service';
const routes = express.Router();

routes.get('/:id', async (req, res, next) => {
    try {
        const client = await getClient(req.params.id);
        if(!client)
            throw new NotFoundError();
        res.send(client);
    } catch (error) {
        next(error);
    }
});

routes.post('', async (req, res, next) => {
    try {
        res.send(await saveClient(req.body as Client));
    } catch (error) {
        next(error);
    }
});

routes.delete('/:id', async (req, res, next) => {
    try {
        res.send(await deleteClient(req.params.id));
    } catch (error) {
        next(error);
    }
})

export default routes;