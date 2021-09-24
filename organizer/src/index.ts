require('dotenv').config();
import express = require('express');
import cors = require('cors');
import routes from './routes';
import { initDb } from './db';

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: '*',
    methods: '*',
}
app.use(cors(corsOptions));
app.use(express.json());
app.use('/organizers', routes);


app.listen(PORT, async () => {
    await initDb();
    console.log(`Servidor sendo executado na porta ${PORT}`);
});