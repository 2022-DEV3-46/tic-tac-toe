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

});
