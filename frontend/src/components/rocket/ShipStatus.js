import React from 'react';
import Spinner from './../../../node_modules/react-bootstrap/Spinner'

const ShipStatus = (props) => {
    const ship = props.context.ship
    const context = props.context

    if (ship.celest_body && !props.isLoading)
        return (
            <div className={`ship__status  ${props.isLoading === true ? 'shaking' : ''}`}>
                <h3> {ship.name} </h3>
                <p> Status : {ship.locationStatus} </p>
                <p> Location : {ship.celest_body.name} </p>
                <p> Fuel remaining :  {context.fuelMassArray.reduce((a, b) => a + b, 0).toFixed(2)} tons </p>
                <p> Weight : {context.totalMass.toFixed(2)} tons </p>
                <p> Velocity : {ship.locationStatus === 'orbit' ? (Math.sqrt(6.67408 * 10e+11 * ship.celest_body.mass * 10e+21 / ship.celest_body.radius * 1000) / 1000000000000000).toFixed(2) : 0} m/s</p>
                <p> Altitude : {ship.altitudeFromParent} km </p>
            </div>
        );
    else return (
        <div className={"ship__status", props.isLoading === true ? 'shaking' : ''}>
            <h3> {ship.name} </h3>
            <Spinner animation="grow" variant="dark" />
        </div>
    )
};

export default ShipStatus;