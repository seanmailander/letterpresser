import { range, randBetween } from './util';
import { getValidMovesFromWord, rankMoves } from './boardOperations';

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
  const chosenWords = range(numberOfMoves)
    .map(() => words[randBetween(0, words.length - 1)]);
  const uniqueChosenWords = [...new Set(chosenWords)];

  const validMovesForWords = uniqueChosenWords
    .map(word => getValidMovesFromWord(board, word));
  return validMovesForWords.map(validMoves => rankMoves(board, validMoves)[0]);
}
