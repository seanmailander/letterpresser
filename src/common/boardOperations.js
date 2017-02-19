import { getCanonical, cartesianProduct } from './util';


export function getValidMovesFromWord(board, word) {
  // board is a string of 25 characters
  // word is a string of 3-25 characters
  // return a complete list of unique ways of playing word on board
  const canonicalWord = getCanonical(word);
  const boardArray = board.split('');

  const getBoardIndexesOfLetter = wordLetter =>
    boardArray
      .map((boardLetter, index) => [boardLetter, index])
      .filter(boardLetter => boardLetter[0] === wordLetter)
      .map(boardLetter => boardLetter[1]);

  const boardPositionsWithMatchingLetters = [...new Set(canonicalWord.split(''))]
    .map(letter => getBoardIndexesOfLetter(letter));

  const allMoves = cartesianProduct(boardPositionsWithMatchingLetters);

  return allMoves.map(move => move.join(','));
}
