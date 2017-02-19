import getTrie from './initializeData';

// Really fast array search
function inObject(arr, search) {
  let len = arr.length;
  while (len--) {
    if (arr[len] === search) { return true; }
  }
  return false;
}

// Custom results object, for each word length, an array of valid anagrams
class AnagramResults {
  results = {};

  addToResults(word) {
    const letterCount = word.length;
    if (typeof (this.results[letterCount]) === 'undefined') this.results[letterCount] = [];
    if (!inObject(this.results[letterCount], word)) { this.results[letterCount].push(word); }
  }

  getResults() {
    return this.results;
  }
}


// Primary entry point for anagram finding
export default function findWords(letters) {
  const currentResults = new AnagramResults();

  const trie = getTrie();

  // Recursive search through trie
  const checkRemaining = (knownLetters, remLetters) => {
    let curWord = '';
    let checkedLetterCache = '';
    for (let i = 0, l = remLetters.length; i < l; i++) {
      if (checkedLetterCache.indexOf(remLetters[i]) !== -1) { continue; }
      checkedLetterCache += remLetters[i];
      curWord = knownLetters + remLetters[i];
      if (trie.isPrefix(curWord)) {
        if (trie.lookup(curWord)) {
          currentResults.addToResults(curWord);
        } // console.log(curWord); //console.log ("found a word: %j", curWord);
        checkRemaining(curWord, remLetters.slice(0, i) + remLetters.slice(i + 1));
      }
    }
  };
  // With dictionary and letters, iterate through to check each word
  checkRemaining('', letters.split('').sort().join(''));

  return currentResults.getResults();
}
