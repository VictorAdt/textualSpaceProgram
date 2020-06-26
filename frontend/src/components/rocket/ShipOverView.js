import React from 'react';

const ShipOverView = (props) => {
    console.log('props.ship' , props.ship);
    if(props.ship.celest_body)
    return (
        <div>
            <p> {props.ship.name} </p>
            <p> {props.ship.locationStatus} </p>
            <p> {props.ship.celest_body.name} </p>
        </div>
    );
    else return ''
};

export default ShipOverView;