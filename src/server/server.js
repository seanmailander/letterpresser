import http from 'http';

import app from './app.js';

app.set('port', process.env.PORT || 3000);
app.set('httpsPort', process.env.HTTPS_PORT || 443);

const httpServer = http.createServer(app).listen(app.get('port'), () => {
  console.log( // eslint-disable-line no-console
    `Express server in the ${
      process.env.NODE_ENV
    } node environment listening on port ${
      httpServer.address().port}`,
  );
});
