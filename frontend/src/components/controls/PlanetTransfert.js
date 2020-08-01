import React from 'react';
import Button from 'react-bootstrap/Button'

const PlanetTransfert = (props) => {
    if (props.ship.celest_body.type === 'star') {
        return (
            props.body.type === 'planet' &&
            props.body.id !== props.ship.celest_body.id &&
            <div className="planet__transfert hud">
                <p> I see a planet. Its {props.body.name}</p>
                <Button variant={'dark'} value={props.body} 
                    onClick={() => props.planetTransfert(props.body)} > 
                    Transfert to {props.body.name} 
                </Button>
            </div>
        )
    } else { 
        return null
    }
};

export default PlanetTransfert

