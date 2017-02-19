/* eslint-disable arrow-body-style, no-unused-expressions, func-names, prefer-arrow-callback */
import _ from 'lodash';
import { expect } from 'chai';

import findWords from '../lib/findWords';

export default function findAllWordsInTrie() {
  describe('findWordsInTrie', function () {
    it('finds at least one word', function () {
      const board = 'batte';
      const foundWords = findWords(board);

      expect(foundWords).to.be.an('object');

      const flattenedWords = [].concat(
        ...Object.keys(foundWords)
            .filter(wordLength => wordLength >= 3)
            .sort(wordLength => wordLength)
            .map(wordLength => foundWords[wordLength]),
      );

      expect(flattenedWords).to.have.length.of.at.least(1);
    });
  });
}
