import serverlessExpress from '@vendia/serverless-express';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { initDb } from './db';
import app from './app';
let serverlessInstance;

/**
 * See https://github.com/vendia/serverless-express/blob/5c1e0a59e9fdce03cbba3912ba33de8dd9773348/README.md#async-setup-lambda-handler
 */
async function setup(event: APIGatewayEvent, context: Context) {
    await initDb();
    serverlessInstance = serverlessExpress({ app: app });
    return serverlessInstance(event, context);
}

/**
 */
export const handler = (event: APIGatewayEvent, context: Context) => {
    if (serverlessInstance) {
        return serverlessInstance(event, context);
    }

    return setup(event, context).catch(err => {
        console.error(err);
    });
}