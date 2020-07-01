import React from 'react';

const FromMoonToMoon = (props) => {
    let parentID 

    // TO FIX
    props.celestBodies.forEach(element => {
        if(element.id === props.ship.celest_body.id){
            parentID = element.childrens[0].id
        }
    });
    return props.celestBodies.map( (e,i) => (
        e.type === 'naturalSatelit' && 
        e.childrens[0].id === parentID && 
        e.id !== props.ship.celest_body.id &&
        <button key={i} onClick={() => props.FromMoonToMoon(e)}> 
            transfert to other moon {e.name} 
        </button>
    ))

}

export default FromMoonToMoon;