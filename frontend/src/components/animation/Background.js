import React, { useContext, cloneElement } from 'react';
import { ShipContext } from '../../contexts/ShipProvider'

const Background = (props) => {
    let target = props.target
    let shipStatus = props.target.locationStatus
    if(target.celest_body === null){
        target = props.context.state.ship
        shipStatus = props.context.state.ship.locationStatus
    }
    return (
        <div className="bg">
            <div className="round_bg" style={{
                backgroundColor: shipStatus === 'orbit' ? '#' + target.celest_body.secondaryColor : '#' + target.celest_body.primaryColor,
                boxShadow:
                    `inset 10px 0 40px #${target.celest_body.secondaryColor}, inset -10px 0 20px  #${target.celest_body.tertiaryColor}, inset -40px 10px 110px #${target.celest_body.quaternaryColor}`,
                width: !target.celest_body.hasGround ? target.celest_body.radius / 200 + 'vh' : shipStatus === 'orbit' ? target.celest_body.radius / 70 + 'vh' : '300vw',
                height: !target.celest_body.hasGround ? target.celest_body.radius / 200 + 'vh' : shipStatus === 'orbit' ? target.celest_body.radius / 70 + 'vh' : '300vh',
                top: shipStatus === 'orbit' ? '5vh' : '80vh',
                animationDuration: shipStatus === 'orbit' ? '120s' : '180s',
            }}>
            </div>
        </div>
    )
};

Background.contextType = ShipContext;

export default Background;