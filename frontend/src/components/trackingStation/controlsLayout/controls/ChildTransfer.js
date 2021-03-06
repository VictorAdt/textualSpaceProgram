import React from 'react';
import ThumbBody from './../../../backgrounds/ThumbBody'

const ChildTransfert = props => {
    if (props.body) {
        return (
            props.body.type === 'naturalSatelit' &&
            props.body.childrens[0].id === props.ship.celest_body.id &&
            <div className="planet__transfert">
                <ThumbBody
                    target={props.body}
                />
                <div className="ChildTransfert navitation__choice">
                    <div className="container__button button_navitation">
                        <div onClick={() => props.childTransfert(props.body)} className="button ship__save__button">Transfert to {props.body.name}</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
};

export default ChildTransfert;