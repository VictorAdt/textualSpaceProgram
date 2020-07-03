import React from 'react';

const CommandModuleReEntry = (props) => {
    if(props){
    let lastStage = props.stage.length - 1
    let hasParachute = false
    for(let i = 0; i< props.stage[lastStage].commandModule.length; i++){
        if(props.stage[lastStage].commandModule[0].hasParachute){
            hasParachute = true
        }
    }
    if (props.ship.celest_body.atmosphere > 1.5 
        && props.ship.celest_body.hasGround
        && props.stage[lastStage].commandModule 
        && hasParachute === true) {
        return (
            <button
                onClick={() => props.commandModuleReEntry()}>
                Detach capsule and land with parachute
            </button>
        )
    } else {
        return null
    }}
};

export default CommandModuleReEntry;