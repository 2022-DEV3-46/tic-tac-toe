import '../app.css';
import { Constants } from '../constants/Constants';

function TicTacToe() {
  return (
    <div className='App'>
      <header data-testid='header' className='App-header'>
        {Constants.HEADER}
      </header>
    </div>
  );
}

export default TicTacToe;
