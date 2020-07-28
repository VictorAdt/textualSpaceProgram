import React from 'react';

const CommandModuleReEntry = (props) => {
    if (props.ship.celest_body.atmosphere > 1.5
        && props.ship.celest_body.hasGround) {
        return (
            <button
                onClick={() => props.commandModuleReEntry()}>
                Detach capsule and land with parachute
            </button>
        )
    } else {
        return null
    }
}

export default CommandModuleReEntry;