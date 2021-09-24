import express = require('express');
import { Organizer } from './models/OrganizerModel';

import { deleteOrganizer, getOrganizer, saveOrganizer } from './service';
const routes = express.Router();

routes.get('/:id', async (req, res) => {
    res.send(await getOrganizer(req.params.id));
});

routes.post('', async (req, res) => {
    res.send(await saveOrganizer(req.body as Organizer));
});

routes.delete('/:id', async (req, res) => {
    res.send(await deleteOrganizer(req.params.id));
})

export default routes;