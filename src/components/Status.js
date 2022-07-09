import React from 'react';
import { Constants } from '../constants/Constants';
import PropTypes from 'prop-types';

function Status({ currentPlayer }) {
    const updateStatus = () => {
        return currentPlayer.NAME + Constants.TURN;
    };

    return (
        <label data-testid="status">{updateStatus()}</label>
    );
}

Status.propTypes = {
    currentPlayer: PropTypes.object.isRequired
};

export default Status;
