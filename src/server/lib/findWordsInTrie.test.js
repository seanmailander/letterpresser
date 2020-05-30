/* eslint-disable arrow-body-style, no-unused-expressions, func-names, prefer-arrow-callback */
import { expect } from 'chai';

import { findWordsInTrie } from './findWords';
import { getTrie } from './initializeData';


const trie = getTrie();

describe('findWordsInTrie', () => {
  test.skip('finds at least one word', () => {
    const board = 'batter';
    const foundWords = findWordsInTrie(board);

    expect(foundWords).to.be.an('array');

    const flattenedWords = [].concat(
      ...Object.keys(foundWords)
        .filter((wordLength) => wordLength >= 3)
        .sort((wordLength) => wordLength)
        .map((wordLength) => foundWords[wordLength]),
    );

    expect(flattenedWords).to.have.length.of.at.least(1);
  });

  test.skip('find a valid prefix', () => {
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
