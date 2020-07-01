import React from 'react';

const PlanetTransfert = (props) => {
    return props.celestBodies.map( (e,i) =>
        e.type === 'planet' &&
        <button key={i} value={e} onClick={() => props.planetTransfert(e)} > {e.name} </button>
    )
};

export default PlanetTransfert