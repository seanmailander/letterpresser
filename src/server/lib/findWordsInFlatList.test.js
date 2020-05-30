/* eslint-disable arrow-body-style, no-unused-expressions, func-names, prefer-arrow-callback */
import { expect } from 'chai';

import { getFlatWordList } from './initializeData';

import { getWordsForBoardFromDictionary } from './BigFlatWordList';

const flatWordList = getFlatWordList();

describe('findWordsInFlatList', () => {
  test('finds at least one word', () => {
    const board = 'batter';
    const foundWords = getWordsForBoardFromDictionary(board, flatWordList);

    expect(foundWords).to.be.an('array');
    expect(foundWords).to.have.length.of.at.least(1);
  });
});
