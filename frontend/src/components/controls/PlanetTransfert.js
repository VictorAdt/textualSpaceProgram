import React from 'react';
import Button from 'react-bootstrap/Button'

const PlanetTransfert = (props) => {
    if (props.ship.celest_body.type === 'star') {
        return (
            props.body.type === 'planet' &&
            props.body.id !== props.ship.celest_body.id &&
            <div className="container__button button_navitation">
                <div onClick={() => props.planetTransfert(props.body)
                } className="button ship__save__button"> Transfert to {props.body.name} </div>
            </div>
        )
    } else {
        return null
    }
};

export default PlanetTransfert

