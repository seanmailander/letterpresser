import game from './routes/game.js';

export default (app) => {
    app.use('/api', game);
};
