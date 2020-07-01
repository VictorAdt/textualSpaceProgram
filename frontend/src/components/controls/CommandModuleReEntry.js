import React from 'react';

const CommandModuleReEntry = (props) => {
    return (
        <button
            onClick={() => props.commandModuleReEntry()}>
            Detach capsule and land with parachute
        </button>
    );
};

export default CommandModuleReEntry;