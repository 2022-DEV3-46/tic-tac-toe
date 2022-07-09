import { render, screen } from '@testing-library/react';
import TicTacToe from './TicTacToe';
import { Constants } from '../constants/TestConstants';

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

});
