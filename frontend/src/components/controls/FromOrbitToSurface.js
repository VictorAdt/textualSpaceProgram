import React from 'react';

const FromOrbitToSurface = (props) => {
    return (
        <button
            onClick={() => props.fromOrbitToSurface()}>
            Land on ground
        </button>
    );
};

export default FromOrbitToSurface;