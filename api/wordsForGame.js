const util = require('util');
const { getWordsForGame, getRandomGameBoard } = require('../src/server/services/letterpresser.js');

module.exports = (req, res, next) => {
  // req.check('board', 'board must exist').notEmpty();
  // if (req.params.board) {
  //   req.sanitize('board').alphaOnly();
  //   req.sanitize('board').toLowerCase();
  //   req.assert('board', 'board must have 25 letters').len(25, 25);
  // }

  // const errors = req.validationErrors() || [];
  // if (errors.length) {
    // next(util.inspect(errors));
  // } else {
        // all validation passed
        console.log(req.query);
    const gameBoard = req.query.board;

  const wordsForGame = getWordsForGame(gameBoard);
  console.log(wordsForGame);
    res.json(wordsForGame);
  // }
};