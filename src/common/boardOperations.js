import { cartesianProduct, getCanonicalFromMove, uniqBy, arrayIsUnique } from './util';

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

  const moves = cartesianProduct(boardPositionsWithMatchingLetters);

  const validMoves = moves.filter(arrayIsUnique);

  const canonicalMoves = validMoves.map(move => [move, getCanonicalFromMove(move)]);

  const uniqueMoves = uniqBy(canonicalMoves, move => move[1]).map(move => move[0]);

  return uniqueMoves;
}
