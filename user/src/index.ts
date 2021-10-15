require('dotenv').config();
import express = require('express');
import cors = require('cors');
import routes from './routes/routes';
import { initDb } from './db';

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: '*',
    methods: '*',
}
app.use(cors(corsOptions));
app.use(express.json());
app.use('/users', routes);


app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(error.statusCode).send({errorMessage: error.message});
    next();
});
app.listen(PORT, async () => {
    await initDb();
    console.log(`Servidor sendo executado na porta ${PORT}`);
});