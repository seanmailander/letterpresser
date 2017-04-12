import { isGameOver, boardAnalysis, applyMoveToBoard, getValidMovesFromWord, StartingBoardState } from '../../common/boardOperations';
import { getWinningMoves } from '../../common/moveAnalysis';
import { range } from '../../common/util';

function start(board, words) {
  console.log(board);
  console.log(words);
  

  const noticeBetterMove = (index, move) => {
    // console.log('noticed better move');
    // console.log(index);
    // console.log(move);
    postMessage(JSON.stringify({ index, move }));
  };
  
  const moveStream = getWinningMoves(board, words, noticeBetterMove);
  // console.log(JSON.stringify(moveStream));
  // postMessage(JSON.stringify({ board, moveStream }));
}

self.onmessage = (e) => {
  const { board, validWords } = JSON.parse(e.data);
  if (board && validWords) {
    start(board, validWords);
  }
};
