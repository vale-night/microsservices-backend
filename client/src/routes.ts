import express = require('express');
import { Client } from './models/ClientModel';

import { deleteClient, getClient, saveClient } from './service';
const routes = express.Router();

routes.get('/:id', async (req, res) => {
    res.send(await getClient(req.params.id));
});

routes.post('', async (req, res) => {
    res.send(await saveClient(req.body as Client));
});

routes.delete('/:id', async (req, res) => {
    res.send(await deleteClient(req.params.id));
})

export default routes;