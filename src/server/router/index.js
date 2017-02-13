const game = require('./routes/game');
module.exports = (app) => {
    app.use('/api/game', game);
};
