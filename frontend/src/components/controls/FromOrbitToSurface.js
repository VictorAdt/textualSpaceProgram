import React from 'react';

const FromOrbitToSurface = (props) => {
    return (
        <button
            // hasGround={this.hasGround}
            onClick={() => props.fromOrbitToSurface()}>
            land on ground
        </button>
    );
};

export default FromOrbitToSurface;