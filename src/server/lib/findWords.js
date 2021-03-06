import { getTrie, getFlatWordList } from './initializeData.js';
import { getWordsForBoardFromDictionary } from './BigFlatWordList.js';


// Primary entry point for anagram finding
export function findWordsInTrie(letters) {
  const currentResults = [];

  const trie = getTrie();

  // Recursive search through trie
  const checkRemaining = (knownLetters, remLetters) => {
    let curWord = '';
    let checkedLetterCache = '';
    // eslint-disable-next-line no-plusplus
    for (let i = 0, l = remLetters.length; i < l; i++) {
      // eslint-disable-next-line no-continue
      if (checkedLetterCache.indexOf(remLetters[i]) !== -1) { continue; }
      checkedLetterCache += remLetters[i];
      curWord = knownLetters + remLetters[i];
      if (trie.isPrefix(curWord)) {
        if (trie.lookup(curWord)) {
          currentResults.push(curWord);
        } // console.log(curWord); //console.log ("found a word: %j", curWord);
        checkRemaining(curWord, remLetters.slice(0, i) + remLetters.slice(i + 1));
      }
    }
  };
  // With dictionary and letters, iterate through to check each word
  checkRemaining('', letters.split('').sort().join(''));
  return [...new Set(currentResults)];
}

export function findWordsInFlatList(letters) {
  const flatWordList = getFlatWordList();
  const foundWords = getWordsForBoardFromDictionary(letters, flatWordList);
  return foundWords;
}
