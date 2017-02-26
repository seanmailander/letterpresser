import React, { Component, PropTypes } from 'react';

import { range } from '../../common/util';

const LetterState = {
  Unclaimed: 1,
  Player1: 2,
  Player2: 4,
  Locked: 8,
};

class Board extends Component {

  static generateLetter(letterIndex, letterContent, currentLetterState) {
    /* eslint no-bitwise: ["error", { "allow": ["&"] }] */
    /* eslint-disable no-nested-ternary */
    /* eslint-disable no-multi-spaces */
    const id = `letter${letterIndex}`;
    const isUnclaimed = (currentLetterState & LetterState.Unclaimed) === LetterState.Unclaimed;
    const isPlayer1 = (currentLetterState & LetterState.Player1) === LetterState.Player1;
    const isLocked = (currentLetterState & LetterState.Locked) === LetterState.Locked;

    const player =
      isUnclaimed ? 0 :
        isPlayer1 ? 1 :
          2;

    const playerClass = `p${player}`;
    const lockedClass = isLocked ? 'locked' : '';
    const letterClass = `letter ${playerClass} ${lockedClass} `;

    return (
      <span className={ letterClass } key={ id }>
        {letterContent}
      </span>
    );
  }

  static applyMovesToBoard(startingBoardState, moveStream) {
    return moveStream.reduce((boardState, currentMove, currentIndex) => {
      // First move is player 1
      const isPlayer1 = currentIndex % 2 === 0;

      // Map this move onto board positions
      return boardState.map((currentPositionValue, currentPosition) => {
        // Current move contains this board position
        const isPartOfCurrentMove = currentMove.includes(currentPosition);
        // Apply new owner of board position
        return !isPartOfCurrentMove ? currentPositionValue :
            isPlayer1 ? LetterState.Player1 :
              LetterState.Player2;
      });
    }, startingBoardState);
  }

  static applyLockingToBoard(boardState) {
    // for each known adjactent
    //  if 
    const adjacents = [
      [1,5],         //0:0
      [0,2,6],       //0:1
      [1,3,7],       //0:2
      [2,4,8],       //0:3
      [3,9],         //0:4
      [0,6,10],      //1:0
      [1,5,7,11],    //1:1
      [2,6,8,12],    //1:2
      [3,7,9,13],    //1:3
      [4,8,14],      //1:4
      [5,11,15],     //2:0
      [6,10,12,16],  //2:1
      [7,11,13,17],  //2:2
      [8,12,14,18],  //2:3
      [9,13,19],     //2:4
      [10,16,20],    //3:0
      [11,15,17,21], //3:1
      [12,16,18,22], //3:2
      [13,17,19,23], //3:3
      [14,18,24],    //3:4
      [15,21],       //4:0
      [16,20,22],    //4:1
      [17,21,23],    //4:2
      [18,22,24],    //4:3
      [19,23],       //4:4
    ];
    return adjacents.map((adjacentPositions, currentPosition) => {
      const isLocked = adjacentPositions.every(position => (boardState[position] | boardState[currentPosition]) === boardState[currentPosition]);
      return boardState[currentPosition] | (isLocked ? LetterState.Locked : null);
    });
  }

  static processMoveStream(board, moveStream) {
    // moveStream is an array of valid moves
    // each move is a comma-concatenated string of letter positions

    // Create empty board to start with
    const startingBoardState = range(25).map(() => LetterState.Unclaimed);

    // Apply all moves from stream
    const boardStateWithPlayers = Board.applyMovesToBoard(startingBoardState, moveStream);

    // Apply locking based upon entire board
    const boardStateWithLocking = Board.applyLockingToBoard(boardStateWithPlayers);

    return boardStateWithLocking;
  }

  static generateBoardComponents(board, boardState) {
    return range(25).map(letterIndex => this.generateLetter(
            letterIndex,
            board[letterIndex],
            boardState[letterIndex],
            ));
  }

  render() {
    const { board, moveStream } = this.props;
    const boardState = Board.processMoveStream(board, moveStream);
    const boardComponents = Board.generateBoardComponents(board, boardState);

    return (
      <div className='gameBoard'>
        {boardComponents}
      </div>
    );
  }
}


Board.propTypes = {
  board: PropTypes.string.isRequired,
  moveStream: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export default Board;
