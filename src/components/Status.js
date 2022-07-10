import React, { useState, useEffect } from 'react';
import { Constants, Position, Player_Name } from '../constants/Constants';
import PropTypes from 'prop-types';

function Status({ currentPlayer, board, onGameEnd }) {
    const [statusMessage, setStatusMessage] = useState('');
    const [winner, setWinner] = useState('');

    useEffect(() => {
        updateStatus();
    });

    const updateStatus = () => {
        if (hasWinner()) {
            setStatusMessage(winner + Constants.WON);
            onGameEnd(true);
            return;
        }
        setStatusMessage(currentPlayer.NAME + Constants.TURN);
    };

    const hasWinner = () => {
        return isAnyRowPlayedBySamePlayer() ||
            isLeftColumnPlayedBySamePlayer();
    }

    const isAnyRowPlayedBySamePlayer = () => {
        return isTopRowPlayedBySamePlayer() ||
            isMiddleRowPlayedBySamePlayer() ||
            isBottomRowPlayedBySamePlayer();
    }

    const isTopRowPlayedBySamePlayer = () => {
        return isSquaresPlayedBySamePlayer(Position.TOP_ROW_SQUARES);
    };

    const isMiddleRowPlayedBySamePlayer = () => {
        return isSquaresPlayedBySamePlayer(Position.MIDDLE_ROW_SQUARES);
    };

    const isBottomRowPlayedBySamePlayer = () => {
        return isSquaresPlayedBySamePlayer(Position.BOTTOM_ROW_SQUARES);
    };

    const isLeftColumnPlayedBySamePlayer = () => {
        return isSquaresPlayedBySamePlayer(Position.LEFT_COLUMN_SQUARES);
    };

    const isSquaresPlayedBySamePlayer = (positions) => {
        if (positions.map((position) => board[position])
            .every((value, index, squares) => value && value === squares[Position.FIRST_SQUARE])) {
            setWinner(Player_Name[getWinningPlayerSymbol(board, positions)]);
            return true;
        }
        return false;
    };

    const getWinningPlayerSymbol = (board, winningSquares) => {
        return board[winningSquares[Position.FIRST_SQUARE]];
    };

    return (
        <label data-testid="status">{statusMessage}</label>
    );
}

Status.propTypes = {
    currentPlayer: PropTypes.object.isRequired,
    board: PropTypes.array.isRequired,
    onGameEnd: PropTypes.func.isRequired
};

export default Status;
