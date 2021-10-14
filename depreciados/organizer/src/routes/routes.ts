import express = require('express');
import { InternalServerError } from '../exceptions/InternalServerError';
import { NotFoundError } from '../exceptions/NotFoundError';
import { handleAuth } from '../middlewares/middlewares';
import { Organizer } from '../models/OrganizerModel';

import { deleteOrganizer, getOrganizer, saveOrganizer } from '../services/service';
const routes = express.Router();

routes.get('/:id', handleAuth,async (req, res, next) => {
    try {
        const organizer = await getOrganizer(req.params.id);
        if (!organizer)
            throw new NotFoundError('Organizador não encontrado');
        res.send(organizer);
    } catch (error) {
        next(error);
    }
});

routes.post('', async (req, res, next) => {
    try {
        res.send(await saveOrganizer(req.body as Organizer));
    } catch (error) {
        next(error);
    }
});

routes.delete('/:id', handleAuth, async (req, res, next) => {
    try {
        res.send(await deleteOrganizer(req.params.id));
    } catch (error) {
        next(error);
    }
})

export default routes;