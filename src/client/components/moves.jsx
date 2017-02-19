
import React, { Component, PropTypes } from 'react';

class Moves extends Component {
  static getWordsFromMoveStream(board, moveStream) {
    // moveStream is an array of valid moves
    // each move is an array letter positions

    // Extract all words from stream
    const words = moveStream.map(currentMove => currentMove.map(boardPosition => board[boardPosition]).join(''));
    return words;
  }

  static generateMoveComponents(words) {
    const moveComponents = words.map(word => (
      <div className='word' key={ word }>{word}</div>
    ));
    return moveComponents;
  }

  render() {
    const { board, moveStream } = this.props;
    const words = Moves.getWordsFromMoveStream(board, moveStream);
    const moveComponents = Moves.generateMoveComponents(words);

    return (
      <div className='gameMoves'>
        {moveComponents}
      </div>
    );
  }
}


Moves.propTypes = {
  board: PropTypes.string.isRequired,
  moveStream: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export default Moves;
