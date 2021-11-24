import { app } from "./index"

const serverlessExpress = require('@vendia/serverless-express')

export const handler = serverlessExpress({ app })