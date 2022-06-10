/// <reference path="../@types/hanko-node.d.ts" />

import 'dotenv/config';
import 'reflect-metadata';

import bodyParser from 'body-parser';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { RegisterRoutes } from './generated/routes';
import swaggerDocument from './generated/swagger.json';
import * as logger from './logger';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(logger.inbound)
    .use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RegisterRoutes(app);

app.use(logger.outbound).listen(port, () => {
    console.log(`🚀 Identity ready at http://localhost:${port}/swagger`);
});
