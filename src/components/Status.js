import React from 'react';
import { Constants, Position, Player_Name } from '../constants/Constants';
import PropTypes from 'prop-types';

function Status({ currentPlayer, board }) {
    const updateStatus = () => {
        if (isTopRowPlayedBySamePlayer()) {
            return Player_Name[getWinningPlayerSymbol(board)] + Constants.WON;
        }

        return currentPlayer.NAME + Constants.TURN;
    };

    const getWinningPlayerSymbol = (board) => {
        return board[Position.TOP_ROW_SQUARES[Position.FIRST_SQUARE]];
    }

    const isTopRowPlayedBySamePlayer = () => {
        return Position.TOP_ROW_SQUARES.map((position) => board[position])
            .every((value, index, squares) => value && value === squares[Position.FIRST_SQUARE]);
    };

    return (
        <label data-testid="status">{updateStatus()}</label>
    );
}

Status.propTypes = {
    currentPlayer: PropTypes.object.isRequired,
    board: PropTypes.array.isRequired
};

export default Status;
