import React from 'react';

const FromOrbitToSurface = (props) => {
    if (props.ship.celest_body.hasGround) {
        return (
            <div>
                <h3>Land on the surface using boosters</h3>
                <button
                    onClick={() => props.fromOrbitToSurface()}>
                    Make the re-entry burn
                </button>
            </div>
        );
    } else {
        return null
    }
};

export default FromOrbitToSurface;