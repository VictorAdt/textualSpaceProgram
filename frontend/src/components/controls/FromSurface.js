import React from 'react';
import Button from 'react-bootstrap/Button'

const FromSurface = (props) => {
    return (
            <Button variant="dark" onClick={() => {
                props.fromSurfaceToOrbit()
            }}>orbit</Button>
    );
};

export default FromSurface;