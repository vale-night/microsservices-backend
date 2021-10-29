require('dotenv').config();
import express = require('express');
import cors = require('cors');
import routes from './routes/routes';
import { initDb } from './db';
import swaggerUi = require('swagger-ui-express');

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    // openapi: '3.0.0',
    swagger: '2.0',
    info: {
      title: 'Serviço de Autenticação',
      description: 'Este serviço será utilizado para autenticar o consumidor, gerando tokens JWT que poderão ser utilizados noutros serviços',
      version: '1.0.0',
    },
    host: '',
    basePath: '/auth'
  },
  apis: ['**/*.ts'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: '*',
    methods: '*',
}
app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', routes);
app.use('/auth/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(error.statusCode).send({errorMessage: error.message});
    next();
});

// app.use('/auth/docs', swaggerUi.serve, swaggerUi.setup(swaggerData));
app.listen(PORT, async () => {
    initDb();
    console.log(`Servidor sendo executado na porta ${PORT}`);
});