import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import router from './router/index.js ';

const app = express();

app.use(express.static(path.resolve(`./public`)));

app.use(bodyParser.json());

router(app);

export default app;
