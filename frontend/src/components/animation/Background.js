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
        <div className="bg__ctnr"> {/* 
            {shipStatus === 'orbit' &&
            target.celest_body.parents.map( (e,i) => (
                <div className="natural__satelit round_bg" style={{
                    backgroundColor: target.celest_body.parents[i].primaryColor,
                    boxShadow:
                        `inset 10px 0 40px #${target.celest_body.parents[i].secondaryColor}, inset -10px 0 20px  #${target.celest_body.parents[i].tertiaryColor}, inset -40px 10px 110px #${target.celest_body.parents[i].quaternaryColor}`,
                    width: target.celest_body.parents[i].radius / 150 + 'vh',
                    height:target.celest_body.parents[i].radius / 150 + 'vh',
                    top: getRndInteger(0,100) + '%',
                    left: getRndInteger(0,100) + '%',
                    zIndex: 500,
                    animationDuration: shipStatus === 'orbit' ? '120s' : '180s',
                }}>
                </div> 
            ))}*/}
            <div className="round_bg" style={{
                backgroundColor: shipStatus === 'orbit' ? '#' + target.celest_body.secondaryColor : '#' + target.celest_body.primaryColor,
                boxShadow:
                    `inset 10px 0 40px #${target.celest_body.secondaryColor}, inset -10px 0 20px  #${target.celest_body.tertiaryColor}, inset -40px 10px 110px #${target.celest_body.quaternaryColor}`,
                width: shipStatus === 'orbit' ? !target.celest_body.hasGround ? target.celest_body.radius / 100 + 'px' :  target.celest_body.radius / 70 + 'vh' : '300vw',
                height: shipStatus === 'orbit' ? !target.celest_body.hasGround ? target.celest_body.radius / 100 + 'px' :  target.celest_body.radius / 70 + 'vh' : '100vw',
                top: shipStatus === 'orbit' ? '1vh' : '80vh',
                animationDuration: shipStatus === 'orbit' ? '120s' : '180s',
            }}>
            </div>
        </div>
    )
};

Background.contextType = ShipContext;

export default Background;