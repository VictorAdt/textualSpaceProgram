import React from 'react';

const BackFromParent = (props) => {
    if (props.ship.celest_body === 'naturalSatelit') {
        let id = props.ship.celest_body.id
        let parent

        props.celestBodies.map((e, i) => {
            if (e.id === id) {
                parent = e.childrens
            }
            return <button>{parent.name}</button>
        })
    } else {
        return ''
    }
};

export default BackFromParent;