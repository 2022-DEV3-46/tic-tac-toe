import { render, screen } from '@testing-library/react';
import Status from './Status';
import { Constants } from '../constants/TestConstants';

describe('Status component', () => {

  test('Should display status', () => {
    render(<Status currentPlayer={Constants.PLAYER_ONE} />);
    const status = screen.getByTestId('status');

    expect(status).toBeInTheDocument();
    expect(status.textContent).toBe(Constants.PLAYER_ONE_TURN);
  });

});
