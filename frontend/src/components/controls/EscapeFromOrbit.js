import React from 'react';

const EscapeFromOrbit = (props) => {
    if(props.ship.celest_body.type === 'planet'){
    return (
        <button
            onClick={() => props.escapeFromOrbit()}>
            escape gravity
        </button>
    );} else {
        return null
    }
};

export default EscapeFromOrbit;