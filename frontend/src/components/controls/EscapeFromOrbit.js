import React from 'react';

const EscapeFromOrbit = (props) => {
    return (
        <button
            onClick={() => props.escapeFromOrbit()}>
            escape gravity
        </button>
    );
};

export default EscapeFromOrbit;