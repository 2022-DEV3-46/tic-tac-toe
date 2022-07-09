import '../app.css';
import { Constants } from '../constants/Constants';
import { useState } from 'react';

function TicTacToe() {

  const [board, setBoard] = useState(Array(Constants.TOTAL_SQUARES).fill(''));
  const [currentPlayer, changeCurrentPlayer] = useState(Constants.PLAYER_ONE_SYMBOL);

  const playedOn = (position) => {
    const squares = board.slice();
    squares[position] = currentPlayer;
    setBoard(squares);
    changeCurrentPlayer(togglePlayer());
  }

  const togglePlayer = () => {
    return currentPlayer === Constants.PLAYER_ONE_SYMBOL ? Constants.PLAYER_TWO_SYMBOL : Constants.PLAYER_ONE_SYMBOL;
  }

  const renderBoard = () => {
    return (
      <div className='board'>
        {
          board.map((value, position) => {
            return (
              <span
                key={position}
                data-testid='square'
                className='square'
                onClick={() => playedOn(position)}>
                {value}
              </span>
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
    </div>
  );
}

export default TicTacToe;
