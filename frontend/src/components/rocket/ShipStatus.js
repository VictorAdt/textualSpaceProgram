import React from 'react';

const ShipStatus = (props) => {
    const ship = props.context.ship
    const context = props.context
    
    console.log('props.stage 1231231', props.fuel);
    if(ship.celest_body)
    return (
        <div className={"ship__status", props.isLoading === true ? 'shaking' : ''}>
            <h3> {ship.name} </h3>
            <p> Status : {ship.locationStatus} </p>
            <p> Location : {ship.celest_body.name} </p>
            <p> Fuel remaining :  {context.fuelMassArray.reduce((a, b) => a + b, 0)} tons </p>
            <p> Weight : {context.totalMass} tons </p>
            <p> Velocity : { ship.locationStatus === 'orbit' ? ship.celest_body.orbitalVelocity : 0 } m/s</p>
            <p> altitude from : {ship.celest_body.lowOrbit} km </p>
        </div>
    );
    else return ''
};

export default ShipStatus;