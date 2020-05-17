import express from 'express';
import util from 'util';

import { getWordsForGame, getRandomGameBoard } from '../../services/letterpresser.js';

const router = express.Router();

router.get('/randomGame', (req, res, next) => {
    res.json(getRandomGameBoard());
});

router.get('/wordsForGame', (req, res, next) => {
  const gameBoard = req.query.board;
  res.json(getWordsForGame(gameBoard));
});

export default router;
