import { range, randBetween } from './util';
import { getValidMovesFromWord, rankMoves } from './boardOperations';

export function randomGameBoard() {
  const boardSize = 25;
  return range(boardSize).map(() => String.fromCharCode(randBetween(65, 90))).join('');
}

export function randomMovesFromWords(board, words) {
  const numberOfMoves = 30;
  
  return words
    // Take first valid move for word
    .map(word => getValidMovesFromWord(board, word)[0])
    // Sort chosen moves by word length
    .sort((a, b) => a.length > b.length ? -1 : a.length === b.length ? 0 : 1)
    // Take only a handful
    .slice(0,numberOfMoves);
}
