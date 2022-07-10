export const Constants = {
    HEADER: 'Tic Tac Toe Game',
    TOTAL_SQUARES: 9,
    PLAYER_ONE_SYMBOL: 'X',
    PLAYER_TWO_SYMBOL: 'O',
    PLAYER_ONE_TURN: 'Player One Turn',
    PLAYER_TWO_TURN: 'Player Two Turn',
    PLAYER_ONE: {
        SYMBOL: "X",
        NAME: "Player One"
    },
    PLAYER_TWO: {
        SYMBOL: "O",
        NAME: "Player Two"
    },
    EMPTY_BOARD: [...Array(9).fill('')],
    PLAYER_ONE_WINNING_BOARD: ['X', 'X', 'X', 'O', 'O', '', '', '', ''],
    PLAYER_ONE_WON: 'Player One Won',
    PLAYER_TWO_WON: 'Player Two Won'
}

export const Positions = {
    TOP_LEFT_SQUARE: 0,
    TOP_MIDDLE_SQUARE: 1,
    TOP_RIGHT_SQUARE: 2,
    CENTER_LEFT_SQUARE: 3,
    CENTER_SQUARE: 4,
    CENTER_RIGHT_SQUARE: 5,
    BOTTOM_LEFT_SQUARE: 6
}
