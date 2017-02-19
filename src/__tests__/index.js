/* eslint-disable arrow-body-style, no-unused-expressions, func-names, prefer-arrow-callback */

import findAllWordsInTrie from '../server/__tests__/findAllWordsInTrie';
import findWordsInFrozenTrie from '../server/__tests__/findWordsInFrozenTrie';

describe('Testing', function () {
    describe('passes integration tests', function () {
        findAllWordsInTrie();
        findWordsInFrozenTrie();
    });
});