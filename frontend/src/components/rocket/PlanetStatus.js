import React from 'react';
import Spinner from './../../../node_modules/react-bootstrap/Spinner'


const PlanetStatus = (props) => {
    const celestBody = props.ship.celest_body
    if (props.ship.celest_body) {
        return (
            <div className={`planet__overview`} style={{                    
                opacity: props.isLoading ? '0' : '1',
                transition: 'opacity 500ms ease-in'
            }}>
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
        return null
    }
};

export default PlanetStatus;