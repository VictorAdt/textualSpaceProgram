import React from 'react';
import Button from 'react-bootstrap/Button'

const FromOrbitToSurface = (props) => {
    if (props.ship.celest_body.hasGround) {
        return (
            <div>
                <h3>Land on the surface using boosters</h3>
                <Button variant="dark"
                    onClick={() => props.fromOrbitToSurface()}>
                    Make the re-entry burn
                </Button>
            </div>
        );
    } else {
        return null
    }
};

export default FromOrbitToSurface;