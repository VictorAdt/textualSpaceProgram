import React from 'react';
import Button from 'react-bootstrap/Button'

const EscapeFromOrbit = (props) => {
    if(props.ship.celest_body.type !== 'star'){
    return (
        <Button variant="dark"
            onClick={() => props.escapeFromOrbit()}>
            escape gravity
        </Button>
    );} else {
        return null
    }
};

export default EscapeFromOrbit;