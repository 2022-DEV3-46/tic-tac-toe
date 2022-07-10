import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from './TicTacToe';
import { Constants, Positions } from '../constants/TestConstants';

describe('TicTacToe component', () => {
  let squares, Player_One, Player_Two, status;

  beforeEach(() => {
    render(<TicTacToe />);
    squares = screen.queryAllByTestId('square');
    status = screen.getByTestId('status');

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

  test('Should display current players turn', () => {
    expect(status.textContent).toBe(Constants.PLAYER_ONE_TURN);
    Player_One.playOn(Positions.TOP_LEFT_SQUARE);

    expect(status.textContent).toBe(Constants.PLAYER_TWO_TURN);

    Player_Two.playOn(Positions.CENTER_SQUARE);
    expect(status.textContent).toBe(Constants.PLAYER_ONE_TURN);

  });

  test('Should announce player one as winner when he places symbol across the top row', () => {
    Player_One.playOn(Positions.TOP_LEFT_SQUARE);
    Player_Two.playOn(Positions.CENTER_LEFT_SQUARE);
    Player_One.playOn(Positions.TOP_MIDDLE_SQUARE);
    Player_Two.playOn(Positions.CENTER_SQUARE);
    Player_One.playOn(Positions.TOP_RIGHT_SQUARE);

    expect(status.textContent).toBe(Constants.PLAYER_ONE_WON);

  });

  test('Should end game once there is winner', () => {
    Player_One.playOn(Positions.CENTER_LEFT_SQUARE);
    Player_Two.playOn(Positions.TOP_MIDDLE_SQUARE);
    Player_One.playOn(Positions.CENTER_SQUARE);
    Player_Two.playOn(Positions.TOP_LEFT_SQUARE);
    Player_One.playOn(Positions.BOTTOM_LEFT_SQUARE);
    Player_Two.playOn(Positions.TOP_RIGHT_SQUARE);
    Player_One.playOn(Positions.CENTER_RIGHT_SQUARE);

    squares.forEach((square, position) => {
      if (position === Positions.CENTER_LEFT_SQUARE || position === Positions.CENTER_SQUARE || position === Positions.BOTTOM_LEFT_SQUARE) {
        expect(square.textContent).toBe(Constants.PLAYER_ONE_SYMBOL);
      } else if (position === Positions.TOP_MIDDLE_SQUARE || position === Positions.TOP_LEFT_SQUARE || position === Positions.TOP_RIGHT_SQUARE) {
        expect(square.textContent).toBe(Constants.PLAYER_TWO_SYMBOL);
      } else {
        expect(square.textContent).toBe('');
      }
    })
    expect(status.textContent).toBe(Constants.PLAYER_TWO_WON);

  });

  test('Should announce player one as winner when he places symbol across the middle row', () => {
    Player_One.playOn(Positions.CENTER_LEFT_SQUARE);
    Player_Two.playOn(Positions.TOP_LEFT_SQUARE);
    Player_One.playOn(Positions.CENTER_SQUARE);
    Player_Two.playOn(Positions.TOP_MIDDLE_SQUARE);
    Player_One.playOn(Positions.CENTER_RIGHT_SQUARE);

    expect(status.textContent).toBe(Constants.PLAYER_ONE_WON);

  });

  test('Should announce player one as winner when he places symbol across the bottom row', () => {
    Player_One.playOn(Positions.BOTTOM_LEFT_SQUARE);
    Player_Two.playOn(Positions.TOP_LEFT_SQUARE);
    Player_One.playOn(Positions.BOTTOM_MIDDLE_SQUARE);
    Player_Two.playOn(Positions.TOP_MIDDLE_SQUARE);
    Player_One.playOn(Positions.BOTTOM_RIGHT_SQUARE);

    expect(status.textContent).toBe(Constants.PLAYER_ONE_WON);

  });

  test('Should announce player one as winner when he places symbol across the left column', () => {
    Player_One.playOn(Positions.CENTER_RIGHT_SQUARE);
    Player_Two.playOn(Positions.CENTER_LEFT_SQUARE);
    Player_One.playOn(Positions.BOTTOM_MIDDLE_SQUARE);
    Player_Two.playOn(Positions.BOTTOM_LEFT_SQUARE);
    Player_One.playOn(Positions.BOTTOM_RIGHT_SQUARE);
    Player_Two.playOn(Positions.TOP_LEFT_SQUARE);

    expect(status.textContent).toBe(Constants.PLAYER_TWO_WON);

  });

  test('Should announce player one as winner when he places symbol across the middle column', () => {
    Player_One.playOn(Positions.CENTER_RIGHT_SQUARE);
    Player_Two.playOn(Positions.TOP_MIDDLE_SQUARE);
    Player_One.playOn(Positions.TOP_LEFT_SQUARE);
    Player_Two.playOn(Positions.CENTER_SQUARE);
    Player_One.playOn(Positions.BOTTOM_RIGHT_SQUARE);
    Player_Two.playOn(Positions.BOTTOM_MIDDLE_SQUARE);

    expect(status.textContent).toBe(Constants.PLAYER_TWO_WON);

  });

  test('Should announce player one as winner when he places symbol across the right column', () => {
    Player_One.playOn(Positions.CENTER_SQUARE);
    Player_Two.playOn(Positions.TOP_RIGHT_SQUARE);
    Player_One.playOn(Positions.TOP_LEFT_SQUARE);
    Player_Two.playOn(Positions.CENTER_RIGHT_SQUARE);
    Player_One.playOn(Positions.BOTTOM_MIDDLE_SQUARE);
    Player_Two.playOn(Positions.BOTTOM_RIGHT_SQUARE);

    expect(status.textContent).toBe(Constants.PLAYER_TWO_WON);

  });

  test('Should announce player one as winner when he places symbol across the left top diagonal', () => {
    Player_One.playOn(Positions.CENTER_SQUARE);
    Player_Two.playOn(Positions.TOP_RIGHT_SQUARE);
    Player_One.playOn(Positions.TOP_LEFT_SQUARE);
    Player_Two.playOn(Positions.CENTER_RIGHT_SQUARE);
    Player_One.playOn(Positions.CENTER_RIGHT_SQUARE);
    Player_Two.playOn(Positions.BOTTOM_RIGHT_SQUARE);

    expect(status.textContent).toBe(Constants.PLAYER_ONE_WON);

  });

  test('Should announce player one as winner when he places symbol across the right top diagonal', () => {
    Player_One.playOn(Positions.TOP_RIGHT_SQUARE);
    Player_Two.playOn(Positions.TOP_LEFT_SQUARE);
    Player_One.playOn(Positions.CENTER_SQUARE);
    Player_Two.playOn(Positions.CENTER_RIGHT_SQUARE);
    Player_One.playOn(Positions.BOTTOM_LEFT_SQUARE);

    expect(status.textContent).toBe(Constants.PLAYER_ONE_WON);

  });

  test('Should announce game as draw when there is no winner and no square left to play', () => {
    Player_One.playOn(Positions.CENTER_SQUARE);
    Player_Two.playOn(Positions.BOTTOM_RIGHT_SQUARE);
    Player_One.playOn(Positions.TOP_RIGHT_SQUARE);
    Player_Two.playOn(Positions.TOP_MIDDLE_SQUARE);
    Player_One.playOn(Positions.CENTER_RIGHT_SQUARE);
    Player_Two.playOn(Positions.BOTTOM_LEFT_SQUARE);
    Player_One.playOn(Positions.TOP_LEFT_SQUARE);
    Player_Two.playOn(Positions.CENTER_LEFT_SQUARE);
    Player_One.playOn(Positions.BOTTOM_MIDDLE_SQUARE);

    expect(status.textContent).toBe(Constants.GAME_IS_DRAW);

  });

});
