import React, { useContext, cloneElement } from 'react';
import { ShipContext } from '../../contexts/ShipProvider'

const Background = (props) => {
    let target = props.target
    let shipStatus = props.target.locationStatus

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }

    if(target.celest_body === null){
        target = props.context.state.ship
        shipStatus = props.context.state.ship.locationStatus
    }
    return (
        <div className={`bg__ctnr ${props.context.state.isLoading ? 'shaking' : ''}`}> 
            <div className={`round_bg`} style={{
                backgroundColor: shipStatus === 'orbit' ? '#' + target.celest_body.secondaryColor : '#' + target.celest_body.primaryColor,
                boxShadow:
                    `inset 10px 0 40px #${target.celest_body.secondaryColor}, inset -10px 0 20px  #${target.celest_body.tertiaryColor}, inset -40px 10px 110px #${target.celest_body.quaternaryColor}`,
                width: 
                    shipStatus === 'orbit' ? !target.celest_body.hasGround ? 120 + 'vh' :  target.celest_body.radius / 70 + 'vh' : '110vw',
                height: shipStatus === 'orbit' ? !target.celest_body.hasGround ? 120 + 'vh' :  target.celest_body.radius / 70 + 'vh' : '110vw',
                transform: shipStatus === 'orbit' ? 'translateY(0)' : 'translateY(80%)',
                animationDuration: shipStatus === 'orbit' ? '120s' : '180s',
            }}>
            </div>
        </div>
    )
};

Background.contextType = ShipContext;

export default Background;