import '../app.css';
import { Constants } from '../constants/Constants';

function TicTacToe() {

  const renderBoard = () => {
    return (
      <div className='board'>
        {
          [...Array(Constants.TOTAL_SQUARES)].map((value, position) => {
            return (
              <button key={position} data-testid='square' className='square' />
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
