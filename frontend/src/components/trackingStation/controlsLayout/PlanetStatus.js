import React from 'react';
import {addSpaceNumber} from './../../../utils/addSpaceNumber'

const PlanetStatus = (props) => {
    const celestBody = props.ship.celest_body
    if (props.ship.celest_body) {
        return (
            <div className={`planet__overview`} style={{
                opacity: props.isLoading ? '0' : '1',
                transition: 'opacity 500ms ease-in'
            }}>
                <h3> {celestBody.name}</h3>
                {celestBody.type !== 'star' &&
                    <div>
                        <p> Apoapsis : {addSpaceNumber(celestBody.apoapsis)} km</p>
                        <p> Periapsis : {addSpaceNumber(celestBody.periapsis)} km</p>
                    </div>
                }
                <p> Surface gravity : {celestBody.gravitationalConstant}</p>
                <p> Type : {celestBody.type === 'star' ? 'Yellow dwarf' : celestBody.hasGround === true ? 'Terrestrial' : 'Gaseous'} </p>
                <p> Radius : {addSpaceNumber(celestBody.radius)} km</p>
            </div>
        )
    }
    else {
        return null
    }
};

export default PlanetStatus;