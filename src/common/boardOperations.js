import { cartesianProductWithoutDuplicates, getCanonicalFromMove } from './util';

export function getWordFromBoardPositions(board, positions) {
  return positions.map(boardPosition => board[boardPosition]).join('');
}

export function getValidMovesFromWord(board, word) {
  // board is a string of 25 characters
  // word is a string of 3-25 characters
  // return a complete list of unique ways of playing word on board
  const boardArray = board.split('');

  const getBoardIndexesOfLetter = wordLetter =>
    boardArray
      .map((boardLetter, index) => [boardLetter, index])
      .filter(boardLetter => boardLetter[0] === wordLetter)
      .map(boardLetter => boardLetter[1]);

  const boardPositionsWithMatchingLetters = word.split('')
    .map(letter => getBoardIndexesOfLetter(letter));

  const moves = cartesianProductWithoutDuplicates(boardPositionsWithMatchingLetters, getCanonicalFromMove);
  
  return moves;
}
