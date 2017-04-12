import { isGameOver, boardAnalysis, applyMoveToBoard, getValidMovesFromWord, StartingBoardState } from '../../common/boardOperations';
import { getWinningMoves } from '../../common/moveAnalysis';
import { range } from '../../common/util';

function start(board, words) {
  const moveStream = getWinningMoves(board, words);

  postMessage(`${board} ${moveStream.join(' ')}`);
}

self.onmessage = (e) => {
  const [board, validMoves] = e.data.split(' ');
  if (board && validMoves) {
    start(board, validMoves.split(','));
  }
};
