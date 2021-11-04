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
      title: 'Serviço de Usuários',
      description: 'Este serviço será utilizado para gerenciar informações de usuários dentro do sistema.',
      version: '1.0.0',
    },
    host: '',
    basePath: '/users',
    securityDefinitions: {
      BearerTokenAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Bearer token JWT válido'
      }
    },
    security: [
      { BearerTokenAuth: [] }
    ]
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
app.use('/users', routes);
app.use('/users/v1/api-docs/', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(error.statusCode).send({errorMessage: error.message});
    next();
});
app.listen(PORT, async () => {
    await initDb();
    console.log(`Servidor sendo executado na porta ${PORT}`);
});