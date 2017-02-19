
import { findWordsInTrie, findWordsInFlatList } from '../lib/findWords';

import { randomGameBoard } from '../lib/mockData';

export const getRandomGameBoard = () => randomGameBoard();

export const getWordsForGame = board => findWordsInFlatList(board).filter(word => word.length >= 3);
