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

        if (isBoardFull()) {
            setStatusMessage(Constants.GAME_IS_DRAW);
            return;
        }

        setStatusMessage(currentPlayer.NAME + Constants.TURN);
    };

    const isBoardFull = () => {
        return board.every((value) => { return value });
    }

    const hasWinner = () => {
        return isAnyRowPlayedBySamePlayer() ||
            isAnyColumnPlayedBySamePlayer() ||
            isAnyDiagonalPlayedBySamePlayer();
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

    const isAnyColumnPlayedBySamePlayer = () => {
        return isLeftColumnPlayedBySamePlayer() ||
            isMiddleColumnPlayedBySamePlayer() ||
            isRightColumnPlayedBySamePlayer();
    }

    const isLeftColumnPlayedBySamePlayer = () => {
        return isSquaresPlayedBySamePlayer(Position.LEFT_COLUMN_SQUARES);
    };

    const isMiddleColumnPlayedBySamePlayer = () => {
        return isSquaresPlayedBySamePlayer(Position.MIDDLE_COLUMN_SQUARES);
    };

    const isRightColumnPlayedBySamePlayer = () => {
        return isSquaresPlayedBySamePlayer(Position.RIGHT_COLUMN_SQUARES);
    };

    const isAnyDiagonalPlayedBySamePlayer = () => {
        return isLeftTopDiagonalPlayedBySamePlayer() ||
            isRightTopDiagonalPlayedBySamePlayer();
    };

    const isLeftTopDiagonalPlayedBySamePlayer = () => {
        return isSquaresPlayedBySamePlayer(Position.LEFT_TOP_DIAGONAL_SQUARES);
    };

    const isRightTopDiagonalPlayedBySamePlayer = () => {
        return isSquaresPlayedBySamePlayer(Position.RIGHT_TOP_DIAGONAL_SQUARES);
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
