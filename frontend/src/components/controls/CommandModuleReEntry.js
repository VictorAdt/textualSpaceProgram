import React from 'react';
import Button from 'react-bootstrap/Button'

const CommandModuleReEntry = (props) => {
    if (props.ship.celest_body.atmosphere > 1.5
        && props.ship.celest_body.hasGround) {
        return (
            <Button variant="dark"
                onClick={() => props.commandModuleReEntry()}>
                Detach capsule and land with parachute
            </Button>
        )
    } else {
        return null
    }
}

export default CommandModuleReEntry;