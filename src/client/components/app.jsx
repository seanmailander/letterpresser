import React from 'react';

import Board from './board';
import Moves from './moves';
import Controls from './controls';

import { randomizeGameBoard, randomMoves, randomMovesFromWords } from '../helpers/mockData';

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
      .then(board => [board, getWordsForGame(board)])
      .spread((board, words) => {
        this.setState({
          board,
          moveStream: randomMovesFromWords(board, words),
        });
      });
  }

  render() {
    const { board, moveStream } = this.state;

    return (
      <div className='appContainer'>
        <Controls onRandomize={ this.newRandomGame } />
        <Board board={ board } moveStream={ moveStream } />
        <Moves board={ board } moveStream={ moveStream } />
      </div>
    );
  }
}

export default App;
