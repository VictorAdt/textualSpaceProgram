import React from 'react';
import Button from 'react-bootstrap/Button'

const FromOrbitToSurface = props => {
    if (props.ship.celest_body.hasGround) {
        return (
            <div className="FromOrbitToSurface navitation__choice">
                <div className="container__button button_navitation">
                    <div onClick={() => props.fromOrbitToSurface()} className="button ship__save__button">land on {props.ship.celest_body.name} by using booster</div>
                </div>
            </div>
        );
    } else {
        return null
    }
};

export default FromOrbitToSurface;