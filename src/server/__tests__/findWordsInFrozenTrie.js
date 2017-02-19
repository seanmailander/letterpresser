/* eslint-disable arrow-body-style, no-unused-expressions, func-names, prefer-arrow-callback */
import _ from 'lodash';
import { expect } from 'chai';

import getTrie from '../lib/initializeData';


export default function findAllWordsInTrie() {
  const trie = getTrie();

  describe('findWordsInTrie', function () {
    it('find a valid prefix', function () {
      // const board = 'abcdeabcdeabcdeabcde';

      expect(trie.isPrefix('b')).to.be.true;
      expect(trie.isPrefix('ba')).to.be.true;
      expect(trie.isPrefix('bat')).to.be.true;
      expect(trie.isPrefix('batt')).to.be.true;
      expect(trie.isPrefix('batte')).to.be.true;
      expect(trie.isPrefix('batter')).to.be.true;
      expect(trie.lookup('battery')).to.be.true;
    });
  });
}
