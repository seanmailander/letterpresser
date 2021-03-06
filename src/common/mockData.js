import { range, randBetween } from './util.js';
import { getValidMovesFromWord, rankMoves } from './boardOperations.js';

export function randomGameBoard() {
  const boardSize = 25;
  return range(boardSize).map(() => String.fromCharCode(randBetween(65, 90))).join('');
}

export function randomMovesFromWords(board, words) {
  const numberOfMoves = 30;

  return words
    // Take first valid move for word
    .map((word) => getValidMovesFromWord(board, word)[0])
    // Sort chosen moves by word length
    // eslint-disable-next-line no-nested-ternary
    .sort((a, b) => (a.length > b.length ? -1 : a.length === b.length ? 0 : 1))
    // Take only a handful
    .slice(0, numberOfMoves);
}
