import React from 'react';

const EscapeFromOrbit = (props) => {
    if (props.ship.celest_body.type !== 'star') {
        return (
            <div className="ChildTransfert navitation__choice">
                <div className="container__button button_navitation">
                    <div onClick={() => props.escapeFromOrbit()} className="button ship__save__button">Escape {props.ship.celest_body.name} gravity influence</div>
                </div>
            </div>
    );
    } else {
        return null
    }
};

export default EscapeFromOrbit;