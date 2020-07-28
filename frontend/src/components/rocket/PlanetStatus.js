import React from 'react';

const PlanetStatus = (props) => {
    const celestBody = props.ship.celest_body
    if(props.ship.celest_body){
    return (
        <div className={`planet__overview`, props.isLoading === true ? 'shaking' : '' }>
            <h3> {celestBody.name}</h3>
            <p> Apoapsis : {celestBody.apoapsis}</p>
            <p> Periapsis : {celestBody.periapsis}</p>
            <p> Surface gravity : {celestBody.gravitationalConstant}</p>
            <p> Type : {celestBody.hasGround === true ? 'Terrestrial' : 'Gaseous'} </p>
            <p> Radius : {celestBody.radius} </p>
            <p> Circumference : </p>
            <p> Biomes : </p>
        </div>
    )}
    else {
        return ''
    }
};

export default PlanetStatus;