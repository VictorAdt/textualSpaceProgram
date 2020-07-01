import React from 'react';

const ChildTransfert = (props) => {
    return props.celestBodies.map( (e,i) => (
        e.type === 'naturalSatelit' && e.childrens[0].id === props.ship.celest_body.id && 
        <button key={i} value={e} onClick={() => props.childTransfert(e)}> 
            Transfert to child {e.name} 
        </button>
    )
)};
        
export default ChildTransfert;