const http = require('http');
// const https = require('https');
const livereload = require('express-livereload');
const path = require('path');

const app = require('./app');

app.set('port', process.env.PORT || 3000);
app.set('httpsPort', process.env.HTTPS_PORT || 443);

// setup livereload
livereload(app, { watchDir: path.resolve(`${__dirname}/../../`) });

const httpServer = http.createServer(app).listen(app.get('port'), () => {
  console.log( // eslint-disable-line no-console
        `Express server in the ${
        process.env.NODE_ENV
        } node environment listening on port ${
        httpServer.address().port}`,
    );
});
