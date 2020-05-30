import express from 'express';

import { getWordsForGame, getRandomGameBoard } from '../../services/letterpresser.js';

const router = express.Router();

router.get('/randomGame', (req, res) => {
  res.json(getRandomGameBoard());
});

router.get('/wordsForGame', (req, res) => {
  const gameBoard = req.query.board;
  res.json(getWordsForGame(gameBoard));
});

export default router;
