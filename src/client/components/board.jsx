import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { range } from '../../common/util';
import { StartingBoardState, LetterState, applyLockingToBoard, applyMovesToBoard } from '../../common/boardOperations';

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


  static processMoveStream(board, moveStream) {
    // moveStream is an array of valid moves
    // each move is a comma-concatenated string of letter positions

    // Apply all moves from stream
    const boardStateWithPlayers = applyMovesToBoard(StartingBoardState, moveStream);

    // Apply locking based upon entire board
    const boardStateWithLocking = applyLockingToBoard(boardStateWithPlayers);

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
