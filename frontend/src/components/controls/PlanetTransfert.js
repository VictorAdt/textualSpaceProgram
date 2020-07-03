import React from 'react';

const PlanetTransfert = (props) => {
    if (props.ship.celest_body.type === 'star') {
        return props.celestBodies.map((e, i) =>
            e.type === 'planet' &&
            e.id !== props.ship.celest_body.id &&
            <button key={i} value={e} 
                onClick={() => props.planetTransfert(e)} > 
                {e.name} 
            </button>
        )
    } else { 
        return null
    }
};

export default PlanetTransfert

