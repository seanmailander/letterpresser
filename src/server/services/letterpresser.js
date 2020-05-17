
import { findWordsInTrie, findWordsInFlatList } from '../lib/findWords.js';

import { randomGameBoard } from '../../common/mockData.js';

export const getRandomGameBoard = () => randomGameBoard();

export const getWordsForGame = board => findWordsInFlatList(board).filter(word => word.length >= 3);
