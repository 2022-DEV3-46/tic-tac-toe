import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from './TicTacToe';
import { Constants, Positions } from '../constants/TestConstants';

describe('TicTacToe component', () => {

  test('Should have header', () => {
    render(<TicTacToe />);

    const headerElement = screen.getByTestId('header');

    expect(headerElement).toBeInTheDocument();
    expect(headerElement.textContent).toBe(Constants.HEADER);
  });

  test('Should have empty nine squares in the board when game starts', () => {
    render(<TicTacToe />);

    const squares = screen.queryAllByTestId('square');

    expect(squares).toHaveLength(Constants.TOTAL_SQUARES);
    squares.forEach((square) => {
      expect(square.textContent).toBe('');
    })
  });

  test('Should show X when player one plays on a square', () => {
    render(<TicTacToe />);

    const squares = screen.queryAllByTestId('square');

    fireEvent.click(squares[Positions.TOP_LEFT_SQUARE]);

    squares.forEach((square, position) => {
      if (position === Positions.TOP_LEFT_SQUARE) {
        expect(square.textContent).toBe(Constants.PLAYER_ONE_SYMBOL);
      } else {
        expect(square.textContent).toBe('');
      }
    })
  });

});
