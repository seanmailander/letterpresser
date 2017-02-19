import { range, randBetween } from './util';
import { getValidMovesFromWord } from './boardOperations';

export function randomMoves() {
  const numberOfMoves = 10;
  const minLetters = 3;
  const maxLetters = 12;

  return range(numberOfMoves).map(() => {
    const lettersInThisMove = randBetween(minLetters, maxLetters);
    return range(lettersInThisMove).map(() => randBetween(0, 25)).join(',');
  });
}

export function randomGameBoard() {
  const boardSize = 25;
  return range(boardSize).map(() => String.fromCharCode(randBetween(65, 90))).join('');
}

export function randomMovesFromWords(board, words) {
  const numberOfMoves = 100;
  const moves = range(numberOfMoves)
    .map(() => words[randBetween(0, words.length)])
    .map(word => getValidMovesFromWord(board, word))
    .map(validMoves => validMoves[0]);
  return [...new Set(moves)];
}
