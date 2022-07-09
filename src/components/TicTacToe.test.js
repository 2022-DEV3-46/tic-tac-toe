import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from './TicTacToe';
import { Constants, Positions } from '../constants/TestConstants';

describe('TicTacToe component', () => {
  let squares;

  beforeEach(() => {
    render(<TicTacToe />);
    squares = screen.queryAllByTestId('square');
  });

  test('Should have header', () => {
    const headerElement = screen.getByTestId('header');

    expect(headerElement).toBeInTheDocument();
    expect(headerElement.textContent).toBe(Constants.HEADER);
  });

  test('Should have empty nine squares in the board when game starts', () => {
    expect(squares).toHaveLength(Constants.TOTAL_SQUARES);
    squares.forEach((square) => {
      expect(square.textContent).toBe('');
    })
  });

  test('Should show X when player one plays on a square', () => {
    fireEvent.click(squares[Positions.TOP_LEFT_SQUARE]);

    squares.forEach((square, position) => {
      if (position === Positions.TOP_LEFT_SQUARE) {
        expect(square.textContent).toBe(Constants.PLAYER_ONE_SYMBOL);
      } else {
        expect(square.textContent).toBe('');
      }
    })
  });

  test('Should show O when player two plays on a square alternatively', () => {
    fireEvent.click(squares[Positions.TOP_LEFT_SQUARE]);
    fireEvent.click(squares[Positions.CENTER_SQUARE]);

    squares.forEach((square, position) => {
      if (position === Positions.TOP_LEFT_SQUARE) {
        expect(square.textContent).toBe(Constants.PLAYER_ONE_SYMBOL);
      } else if (position === Positions.CENTER_SQUARE) {
        expect(square.textContent).toBe(Constants.PLAYER_TWO_SYMBOL);
      } else {
        expect(square.textContent).toBe('');
      }
    })
  });

});
