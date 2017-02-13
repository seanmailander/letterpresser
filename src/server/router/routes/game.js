import express from 'express';
import util from 'util';

import { getWordsForGame, getRandomGameBoard } from '../../services/letterpresser';

const router = express.Router();

router.get('/randomGame', (req, res, next) => {
    res.json(getRandomGameBoard());
});

router.get('/wordsForGame/:board', (req, res, next) => {
  req.check('board', 'board must exist').notEmpty();
  if (req.params.board) {
    req.sanitize('board').alphaOnly();
    req.sanitize('board').toLowerCase();
    req.assert('board', 'board must have 25 letters').len(25, 25);
  }

  const errors = req.validationErrors() || [];
  if (errors.length) {
    next(util.inspect(errors));
  } else {
        // all validation passed
    const gameBoard = req.params.board;


    res.json(getWordsForGame(gameBoard));
  }
});

module.exports = router;
