const serverlessExpress = require('@vendia/serverless-express')
import app = require('./index')
export const handler = serverlessExpress({ app })