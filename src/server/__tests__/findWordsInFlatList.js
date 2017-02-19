/* eslint-disable arrow-body-style, no-unused-expressions, func-names, prefer-arrow-callback */
import { expect } from 'chai';

import { getFlatWordList } from '../lib/initializeData';

import { getWordsForBoardFromDictionary } from '../lib/BigFlatWordList';



export default function findAllWordsInTrie() {
  const flatWordList = getFlatWordList();

  describe('findWordsInFlatList', function () {
    it('finds at least one word', function () {
      const board = 'batter';
      const foundWords = getWordsForBoardFromDictionary(board, flatWordList);

      expect(foundWords).to.be.an('array');
      expect(foundWords).to.have.length.of.at.least(1);
    });
  });
}
