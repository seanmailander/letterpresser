const express = require('express');
const expressValidator = require('express-validator');
const path = require('path');
const bodyParser = require('body-parser');

const router = require('./router');

const app = express();

app.use(express.static(path.resolve(`${__dirname}/../../client`)));

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

module.exports = app;
