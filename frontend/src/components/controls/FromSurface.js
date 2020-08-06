import React from 'react';
import Button from 'react-bootstrap/Button'

const FromSurface = (props) => {
    return (
        <div className="from__surface">
            <Button variant="dark" onClick={() => {
                props.fromSurfaceToOrbit()
            }}>orbit</Button>
        </div>
    );
};

export default FromSurface;