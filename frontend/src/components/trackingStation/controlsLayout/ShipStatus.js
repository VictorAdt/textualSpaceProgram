import React from 'react';
import {addSpaceNumber} from './../../../utils/addSpaceNumber'

const ShipStatus = (props) => {
    const ship = props.context.ship
    const context = props.context
    if (ship.celest_body)
        return (
            <div className={`ship__status`} style={{
                opacity: props.isLoading ? '0' : '1',
                transition: 'opacity 500ms ease-in'
            }}>
                <h3> {ship.name} </h3>
                <p> Status : {ship.locationStatus === 'orbit' ? 'In orbit' : 'Landed'} </p>
                <p> Location : {ship.celest_body.name} </p>
                <p> Fuel remaining :  {addSpaceNumber(context.fuelMassArray.reduce((a, b) => a + b, 0).toFixed(2))} tons </p>
                <p> Weight : {addSpaceNumber(context.totalMass.toFixed(2))} tons </p>
                <p> Velocity : {ship.locationStatus === 'orbit' ?
                    addSpaceNumber((Math.sqrt(6.67408 * 10e+11 * ship.celest_body.mass * 10e+21 / ship.celest_body.radius * 1000) / 1000000000000000).toFixed(2))
                    : 0} m/s</p>
                <p> Altitude : {addSpaceNumber(ship.altitudeFromParent)} km </p>
            </div>
        );
    else return null
};

export default ShipStatus;