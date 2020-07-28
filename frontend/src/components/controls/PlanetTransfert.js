import React from 'react';

const PlanetTransfert = (props) => {
    if (props.ship.celest_body.type === 'star') {
        return (
            props.body.type === 'planet' &&
            props.body.id !== props.ship.celest_body.id &&
            <div className="planet__transfert hud">
                <p> I see a planet. Its {props.body.name}</p>
                <button value={props.body} 
                    onClick={() => props.planetTransfert(props.body)} > 
                    Transfert to {props.body.name} 
                </button>
            </div>
        )
    } else { 
        return null
    }
};

export default PlanetTransfert

