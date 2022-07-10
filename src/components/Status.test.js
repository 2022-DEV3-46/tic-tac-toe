import { render, screen } from '@testing-library/react';
import Status from './Status';
import { Constants } from '../constants/TestConstants';

describe('Status component', () => {

  test('Should display status', () => {
    render(<Status currentPlayer={Constants.PLAYER_ONE} board={Constants.EMPTY_BOARD} />);
    const status = screen.getByTestId('status');

    expect(status).toBeInTheDocument();
    expect(status.textContent).toBe(Constants.PLAYER_ONE_TURN);
  });

  test('Should display status when player wins', () => {
    render(<Status currentPlayer={Constants.PLAYER_ONE} board={Constants.PLAYER_ONE_WINNING_BOARD} />);
    const status = screen.getByTestId('status');

    expect(status).toBeInTheDocument();
    expect(status.textContent).toEqual(Constants.PLAYER_ONE_WON);
  });

});
