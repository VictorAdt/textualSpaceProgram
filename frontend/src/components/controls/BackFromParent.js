import React from 'react';
import Button from 'react-bootstrap/Button'

const BackFromParent = (props) => {
    if (props.ship.celest_body.type === 'naturalSatelit') {
        let id = props.ship.celest_body.id

        return props.celestBodies.map((e, i) => (
            e.id === id &&
                <Button variant="dark" key={i} onClick={() => props.backToParent(e.childrens[0])}> 
                    return to parent : {e.childrens[0].name}
                </Button>
        ))
    } else {
        return null
    }
};

export default BackFromParent;