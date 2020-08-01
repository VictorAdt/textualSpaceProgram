import React from 'react';
import Spinner from './../../../node_modules/react-bootstrap/Spinner'


const PlanetStatus = (props) => {
    const celestBody = props.ship.celest_body
    if (props.ship.celest_body && !props.isLoading) {
        return (
            <div className={`planet__overview ${props.isLoading === true ? 'shaking' : ''}`}>
                <h3> {celestBody.name}</h3>
                <p> Apoapsis : {celestBody.apoapsis} </p>
                <p> Periapsis : {celestBody.periapsis} </p>
                <p> Surface gravity : {celestBody.gravitationalConstant}</p>
                <p> Type : {celestBody.hasGround === true ? 'Terrestrial' : 'Gaseous'} </p>
                <p> Radius : {celestBody.radius} </p>
            </div>
        )
    }
    else {
        return (
            <div className={`planet__overview`, props.isLoading === true ? 'shaking' : ''}>
                <h3> {celestBody.name}</h3>                
                <Spinner animation="grow" variant="dark" />
            </div>
        )
    }
};

export default PlanetStatus;