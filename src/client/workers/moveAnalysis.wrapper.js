const MoveAnalysisWorker = require('worker-loader?name=moveAnalysis.worker.js!./moveAnalysis.worker');



export function getBoardOperationsWorker(board, validWords, handleMoveUpdate) {
  // Build a worker
  const worker = new MoveAnalysisWorker;

  // Listen for incoming messages
  worker.onmessage = (e) => {
    const { index, move } = JSON.parse(e.data);
    handleMoveUpdate(index, move);
    // moveStream.map((move, moveIndex) => {
    //   // Urgh string back to number
    //   handleMoveUpdate(moveIndex, move);
    // });
  };

  // Start the worker
  worker.postMessage(JSON.stringify({ board, validWords }));

  return worker;
}
