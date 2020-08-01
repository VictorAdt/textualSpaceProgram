import React from 'react';
import Button from 'react-bootstrap/Button'

const FromMoonToMoon = (props) => {
    if (props.ship.celest_body.type === 'naturalSatelit') {
        let parentID
        // TO FIX
        props.celestBodies.forEach(element => {
            if (element.id === props.ship.celest_body.id) {
                parentID = element.childrens[0].id
            }
        });
        return props.celestBodies.map((e, i) => (
            e.type === 'naturalSatelit' &&
            e.childrens[0].id === parentID &&
            e.id !== props.ship.celest_body.id &&
                <Button variant="dark" key={i} onClick={() => props.FromMoonToMoon(e)}>
                    transfert to other moon {e.name}
                </Button>
        ))
    } else {
        return null
    }

}

export default FromMoonToMoon;