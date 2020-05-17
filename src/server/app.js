import express from 'express';
import expressValidator from 'express-validator';
import path from 'path';
import bodyParser from 'body-parser';

import router from './router/index.js ';

const app = express();

app.use(express.static(path.resolve(`./dist/client`)));

app.use(bodyParser.json());

app.use(expressValidator({
  customSanitizers: {
    alphaOnly(value) {
      return value.replace(/[^a-zA-Z]/g, '');
    },
    toLowerCase(value) {
      return value.toLowerCase();
    },
  },
}));

router(app);

export default app;
