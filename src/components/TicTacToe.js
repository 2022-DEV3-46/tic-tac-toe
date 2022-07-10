import '../app.css';
import { Constants } from '../constants/Constants';
import { useState } from 'react';
import Status from './Status';

function TicTacToe() {

  const [board, setBoard] = useState(Array(Constants.TOTAL_SQUARES).fill(''));
  const [currentPlayer, changeCurrentPlayer] = useState(Constants.PLAYER_ONE);

  const playedOn = (position) => {
    const squares = board.slice();
    squares[position] = currentPlayer.SYMBOL;
    setBoard(squares);
    changeCurrentPlayer(togglePlayer());
  }

  const togglePlayer = () => {
    return currentPlayer === Constants.PLAYER_ONE ? Constants.PLAYER_TWO : Constants.PLAYER_ONE;
  }

  const renderBoard = () => {
    return (
      <div className='board'>
        {
          board.map((value, position) => {
            return (
              <button
                key={position}
                data-testid='square'
                className='square'
                onClick={() => playedOn(position)}
                disabled={value}>
                {value}
              </button>
            )
          }
          )
        }
      </div>)
  }

  return (
    <div className='App'>
      <header data-testid='header' className='App-header'>
        {Constants.HEADER}
      </header>
      {renderBoard()}
      <div className='status'>
        <Status currentPlayer={currentPlayer} board={board} />
      </div>
    </div>
  );
}

export default TicTacToe;
