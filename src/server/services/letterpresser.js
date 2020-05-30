
import { findWordsInFlatList } from '../lib/findWords.js';

import { randomGameBoard } from '../../common/mockData.js';

export const getRandomGameBoard = () => randomGameBoard();

export const getWordsForGame = (board) => findWordsInFlatList(board.toLowerCase()).filter((word) => word.length >= 3);
