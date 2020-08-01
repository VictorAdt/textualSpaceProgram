import React from 'react';
import Button from 'react-bootstrap/Button'

const ChildTransfert = (props) => {
    if (props.body) {
        return (
            props.body.type === 'naturalSatelit' &&
            props.body.childrens[0].id === props.ship.celest_body.id &&
            <div className="planet__transfert hud">
                <p> I see a moon. Its {props.body.name}</p>
                <Button variant={'dark'} value={props.body} 
                    onClick={() => props.childTransfert(props.body)} > 
                    Transfert to {props.body.name} 
                </Button>
            </div>
        )
    } else {
        return null
    }
};

export default ChildTransfert;