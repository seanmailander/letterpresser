/* eslint-disable arrow-body-style, no-unused-expressions, func-names, prefer-arrow-callback */
import { expect } from 'chai';

import { getValidMovesFromWord, getWordFromBoardPositions } from './boardOperations';
import { symmetricDifference, getCanonicalFromMove } from './util';
import { randomGameBoard } from './mockData';
import { findWordsInFlatList } from '../server/lib/findWords';
import { getWinningMoves } from './moveAnalysis';
import { getWordsForGame } from '../server/services/letterpresser';

function convertMovesToCanonicalSet(moves) {
  return new Set(...[moves.map(getCanonicalFromMove)]);
}


  const randomBoard = randomGameBoard();
  const randomWords = findWordsInFlatList(randomBoard);

  const inefficientBoard = 'abcdeabcdeabcdeabcdeabcde';
  const inefficientWords = findWordsInFlatList(inefficientBoard);

  describe('moveAnalysis', () => {
    test('finds correct ranked moves for simple board', () => {
      const board = 'aabcqqqqqqqqqqqqqqqqqqqqq';
      const validWords = getWordsForGame(board);

      const expectedRankedMoves = [[3, 0, 2, 1], [0, 2, 1, 3], [3, 1, 2], [3, 0, 1], [2, 1, 3]];

      const noticeBetterMove = (index, move) => {
        console.log('noticed better move');
        console.log(index);
        console.log(move);
      };

      const foundRankedMoves = getWinningMoves(board, validWords, noticeBetterMove);

      const mismatchedMoves = symmetricDifference(convertMovesToCanonicalSet(foundRankedMoves), convertMovesToCanonicalSet(expectedRankedMoves));

      expect(foundRankedMoves).to.be.an('array');
      expect([...mismatchedMoves]).to.be.empty;
    });
    test('finds correct ranked moves for complex board', () => {
      throw new "nope";
      this.timeout(30000);
      const board = 'oepkyluanpdmcqxnysmgojrht';

      const validWords = getWordsForGame(board);

      const expectedRankedMoves = [[11, 16, 22, 18, 1, 12, 0, 9, 23, 7, 19, 20, 6, 17], [18, 1, 24, 7, 9, 17, 4, 12, 23, 0, 5, 20, 19, 16], [2, 23, 7, 22, 16, 15, 19, 0, 17, 12, 20, 9, 1], [17, 23, 0, 12, 3, 6, 11, 1, 15, 24, 7, 22, 4], [18, 1, 22, 0, 9, 5, 7, 8, 3, 24, 20, 15, 17]];

      const foundRankedMoves = getWinningMoves(board, validWords);

      const mismatchedMoves = symmetricDifference(
        convertMovesToCanonicalSet(foundRankedMoves),
        convertMovesToCanonicalSet(expectedRankedMoves));

      expect(foundRankedMoves).to.be.an('array');
      expect([...mismatchedMoves]).to.be.empty;
    });
    test('finds correct ranked moves without duplicates', () => {
      throw new "nope";
      this.timeout(30000);
      const board = 'mdwbuwbrhvdgnuupbqhmadubt';

      const validWords = getWordsForGame(board);

      const expectedRankedMoves = [
        [0, 4, 11, 5, 13, 19, 15],
        [19, 4, 1, 11, 13, 20, 7, 10],
        [0, 13, 24, 20, 12, 10, 14, 19],
        [8, 20, 7, 22, 19, 15, 18],
        [8, 20, 7, 22, 19, 15, 18],
      ];

      const foundRankedMoves = getWinningMoves(board, validWords);

      const mismatchedMoves = symmetricDifference(
        convertMovesToCanonicalSet(foundRankedMoves),
        convertMovesToCanonicalSet(expectedRankedMoves));

      expect(foundRankedMoves).to.be.an('array');
      expect([...mismatchedMoves]).to.be.empty;
    });
  });

