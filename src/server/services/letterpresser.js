
import findWords from '../lib/findWords';

import { randomGameBoard } from '../lib/mockData';

export const getRandomGameBoard = () => randomGameBoard();

export const getWordsForGame = (board) => {
  // findWords returns objects with keys of wordlength and values of list of words of that length
  const words = findWords(board);

  return [].concat(
        ...Object.keys(words)
            .filter(wordLength => wordLength >= 3)
            .sort(wordLength => wordLength)
            .map(wordLength => words[wordLength]),
    );
};
