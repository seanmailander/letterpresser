import React from 'react';
import Promise from 'bluebird';

import Board from './board';
import Moves from './moves';
import Controls from './controls';

import { getWinningMoves } from '../../common/boardOperations';

import { getRandomGame, getWordsForGame } from '../services/letterpresser';

const initialState = {
  board: '',
  moveStream: [],
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
    this.newRandomGame();
  }

  newRandomGame = () => {
    getRandomGame()
      .then(board => this.useBoard(board));
  }

  useBoard = (boardString) => {
    Promise.resolve()
      .then(() => [boardString, getWordsForGame(boardString)])
      .spread((board, words) => {
        this.setState({
          board,
          moveStream: getWinningMoves(board, words),
        });
      });
  }

  render() {
    const { board, moveStream } = this.state;

    return (
      <div className='appContainer'>
        <Controls onRandomize={ this.newRandomGame } onUseBoard={ this.useBoard } />
        <Board board={ board } moveStream={ moveStream } />
        <Moves board={ board } moveStream={ moveStream } />
      </div>
    );
  }
}

export default App;
