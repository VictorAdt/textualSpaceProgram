import React from 'react';

const FromOrbitToSurface = (props) => {
    if(props.ship.celest_body.hasGround){
    return (
        <button
            onClick={() => props.fromOrbitToSurface()}>
            Land on ground
        </button>
    );} else {
        return null
    }
};

export default FromOrbitToSurface;