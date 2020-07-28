import React from 'react';

const BackFromParent = (props) => {
    if (props.ship.celest_body.type === 'naturalSatelit') {
        let id = props.ship.celest_body.id

        return props.celestBodies.map((e, i) => (
            e.id === id &&
                <button key={i} onClick={() => props.backToParent(e.childrens[0])}> 
                    return to parent : {e.childrens[0].name}
                </button>
        ))
    } else {
        return null
    }
};

export default BackFromParent;