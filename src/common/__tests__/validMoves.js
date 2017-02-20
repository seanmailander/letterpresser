/* eslint-disable arrow-body-style, no-unused-expressions, func-names, prefer-arrow-callback */
import { expect } from 'chai';

import { getValidMovesFromWord } from '../boardOperations';
import { symmetricDifference, getCanonicalFromMove } from '../util';
import { randomGameBoard } from '../mockData';
import { findWordsInFlatList } from '../../server/lib/findWords';

function convertMovesToCanonicalSet(moves) {
  return new Set(...[moves.map(getCanonicalFromMove)]);
}

export default function validMoves() {
  const randomBoard = randomGameBoard();
  const randomWords = findWordsInFlatList(randomBoard);

  const inefficientBoard = 'abcdeabcdeabcdeabcdeabcde';
  const inefficientWords = findWordsInFlatList(inefficientBoard);

  describe('generateValidMoves', function () {
    it('finds all valid moves for simple board', function () {
      const board = 'bananas';
      const word = 'ban';
      const expectedMoves = [
        [0, 1, 2],
        [0, 1, 4],
        [0, 3, 2],
        [0, 3, 4],
        [0, 5, 2],
        [0, 5, 4]];

      const foundMoves = getValidMovesFromWord(board, word);

      const mismatchedMoves = symmetricDifference(convertMovesToCanonicalSet(expectedMoves), convertMovesToCanonicalSet(foundMoves));

      expect(foundMoves).to.be.an('array');
      expect([...mismatchedMoves]).to.be.empty;
    });
    it('finds all valid moves for simple board with repeats', function () {
      const board = 'banannas';
      const word = 'baann';
      const expectedMoves = [
        [0, 1, 3, 2, 4],
        [0, 1, 3, 2, 5],
        [0, 1, 3, 4, 5],
        [0, 1, 6, 2, 4],
        [0, 1, 6, 2, 5],
        [0, 1, 6, 4, 5],
        [0, 3, 6, 2, 4],
        [0, 3, 6, 2, 5],
        [0, 3, 6, 4, 5]];

      const foundMoves = getValidMovesFromWord(board, word);

      const mismatchedMoves = symmetricDifference(convertMovesToCanonicalSet(expectedMoves), convertMovesToCanonicalSet(foundMoves));

      expect(foundMoves).to.be.an('array');
      expect([...mismatchedMoves]).to.be.empty;
    });
    it('quickly finds moves for normal board', function () {
      randomWords.map((word) => {
        const foundMoves = getValidMovesFromWord(randomBoard, word);

        expect(foundMoves).to.be.an('array');
      });
    });
    it('quickly finds moves for repetetive board', function () {
      inefficientWords.map((word) => {
        const foundMoves = getValidMovesFromWord(inefficientBoard, word);

        expect(foundMoves).to.be.an('array');
      });
    });
    it('finds all valid moves for complex board', function () {
      const board = 'abcdeabcdeabcdeabcdeabcde';
      const word = 'bad';
      const expectedMoves = [
        [0, 1, 3],
        [0, 1, 8],
        [0, 1, 13],
        [0, 1, 18],
        [0, 1, 23],
        [0, 6, 3],
        [0, 6, 8],
        [0, 6, 13],
        [0, 6, 18],
        [0, 6, 23],
        [0, 11, 3],
        [0, 11, 8],
        [0, 11, 13],
        [0, 11, 18],
        [0, 11, 23],
        [0, 16, 3],
        [0, 16, 8],
        [0, 16, 13],
        [0, 16, 18],
        [0, 16, 23],
        [0, 21, 3],
        [0, 21, 8],
        [0, 21, 13],
        [0, 21, 18],
        [0, 21, 23],
        [5, 1, 3],
        [5, 1, 8],
        [5, 1, 13],
        [5, 1, 18],
        [5, 1, 23],
        [5, 6, 3],
        [5, 6, 8],
        [5, 6, 13],
        [5, 6, 18],
        [5, 6, 23],
        [5, 11, 3],
        [5, 11, 8],
        [5, 11, 13],
        [5, 11, 18],
        [5, 11, 23],
        [5, 16, 3],
        [5, 16, 8],
        [5, 16, 13],
        [5, 16, 18],
        [5, 16, 23],
        [5, 21, 3],
        [5, 21, 8],
        [5, 21, 13],
        [5, 21, 18],
        [5, 21, 23],
        [10, 1, 3],
        [10, 1, 8],
        [10, 1, 13],
        [10, 1, 18],
        [10, 1, 23],
        [10, 6, 3],
        [10, 6, 8],
        [10, 6, 13],
        [10, 6, 18],
        [10, 6, 23],
        [10, 11, 3],
        [10, 11, 8],
        [10, 11, 13],
        [10, 11, 18],
        [10, 11, 23],
        [10, 16, 3],
        [10, 16, 8],
        [10, 16, 13],
        [10, 16, 18],
        [10, 16, 23],
        [10, 21, 3],
        [10, 21, 8],
        [10, 21, 13],
        [10, 21, 18],
        [10, 21, 23],
        [15, 1, 3],
        [15, 1, 8],
        [15, 1, 13],
        [15, 1, 18],
        [15, 1, 23],
        [15, 6, 3],
        [15, 6, 8],
        [15, 6, 13],
        [15, 6, 18],
        [15, 6, 23],
        [15, 11, 3],
        [15, 11, 8],
        [15, 11, 13],
        [15, 11, 18],
        [15, 11, 23],
        [15, 16, 3],
        [15, 16, 8],
        [15, 16, 13],
        [15, 16, 18],
        [15, 16, 23],
        [15, 21, 3],
        [15, 21, 8],
        [15, 21, 13],
        [15, 21, 18],
        [15, 21, 23],
        [20, 1, 3],
        [20, 1, 8],
        [20, 1, 13],
        [20, 1, 18],
        [20, 1, 23],
        [20, 6, 3],
        [20, 6, 8],
        [20, 6, 13],
        [20, 6, 18],
        [20, 6, 23],
        [20, 11, 3],
        [20, 11, 8],
        [20, 11, 13],
        [20, 11, 18],
        [20, 11, 23],
        [20, 16, 3],
        [20, 16, 8],
        [20, 16, 13],
        [20, 16, 18],
        [20, 16, 23],
        [20, 21, 3],
        [20, 21, 8],
        [20, 21, 13],
        [20, 21, 18],
        [20, 21, 23]];
      const foundMoves = getValidMovesFromWord(board, word);

      const mismatchedMoves = symmetricDifference(convertMovesToCanonicalSet(expectedMoves), convertMovesToCanonicalSet(foundMoves));

      expect(foundMoves).to.be.an('array');
      expect([...mismatchedMoves]).to.be.empty;
    });
  });
}
