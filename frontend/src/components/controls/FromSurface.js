import React from 'react';

const FromSurface = (props) => {
    return (
        <button onClick={() => {
            props.fromSurfaceToOrbit() 
        }}>orbit</button>
    );
};

export default FromSurface;