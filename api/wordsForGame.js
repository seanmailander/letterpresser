const util = require('util');
const { getWordsForGame, getRandomGameBoard } = require('../src/server/services/letterpresser.js');

module.exports = (req, res, next) => {
  const gameBoard = req.query.board;
  const wordsForGame = getWordsForGame(gameBoard);
  res.json(wordsForGame);
};