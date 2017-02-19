/* eslint-disable arrow-body-style, no-unused-expressions, func-names, prefer-arrow-callback */

import findWordsInTrieTest from '../server/__tests__/findWordsInTrie';
import findWordsInFlatList from '../server/__tests__/findWordsInFlatList';
import validMoves from '../common/__tests__/validMoves';

describe('Testing', function () {
  describe('passes integration tests', function () {
    //findWordsInTrieTest();
    findWordsInFlatList();
    validMoves();
  });
});
