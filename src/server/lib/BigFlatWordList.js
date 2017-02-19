import lazy from 'lazy';


function getCanonical(s) {
  return s.replace(/\W/g, '').split('').sort().join('');
}

function isSubset(iStr, jStr) {
  let i = 0;
  let j = 0;
  const iLength = iStr.length;
  const jLength = jStr.length;

  let ic = '';
  let jc = '';

  for (; i < iLength && j < jLength; i++) {
    ic = iStr.substr(i, 1);
    jc = jStr.substr(j, 1);
    if (ic === jc) {
      j++;
    } else if (ic > jc) {
      break;
    }
  }
  return j === jLength;
}

export function convertWordsToFlatWordList(words) {
  return words.map((line) => {
    const cleanedWord = line.toString().replace(/\W/g, '');
    return [cleanedWord, getCanonical(cleanedWord)];
  });
}

export function getWordsForBoardFromDictionary(board, dictionary) {
  const boardSet = getCanonical(board);
  return dictionary
    .filter(struct => isSubset(boardSet, struct[1]))
    .map(struct => struct[0]);
}
