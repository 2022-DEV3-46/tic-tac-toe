import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from './TicTacToe';
import { Constants, Positions } from '../constants/TestConstants';

describe('TicTacToe component', () => {
  let squares, Player_One, Player_Two;

  beforeEach(() => {
    render(<TicTacToe />);
    squares = screen.queryAllByTestId('square');

    Player_One = {
      playOn: (position) => {
        fireEvent.click(squares[position]);
      }
    };

    Player_Two = {
      playOn: (position) => {
        fireEvent.click(squares[position]);
      }
    };

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
    Player_One.playOn(Positions.TOP_LEFT_SQUARE);

    squares.forEach((square, position) => {
      if (position === Positions.TOP_LEFT_SQUARE) {
        expect(square.textContent).toBe(Constants.PLAYER_ONE_SYMBOL);
      } else {
        expect(square.textContent).toBe('');
      }
    })
  });

  test('Should show O when player two plays on a square alternatively', () => {
    Player_One.playOn(Positions.TOP_LEFT_SQUARE);
    Player_Two.playOn(Positions.CENTER_SQUARE);

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

  test('Should not allow player to play on same square again', () => {
    Player_One.playOn(Positions.TOP_LEFT_SQUARE);
    Player_Two.playOn(Positions.TOP_LEFT_SQUARE);

    squares.forEach((square, position) => {
      if (position === Positions.TOP_LEFT_SQUARE) {
        expect(square.textContent).toBe(Constants.PLAYER_ONE_SYMBOL);
      } else {
        expect(square.textContent).toBe('');
      }
    })
  });

});
