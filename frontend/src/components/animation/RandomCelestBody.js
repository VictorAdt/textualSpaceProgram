import React, { useContext, cloneElement } from 'react';
import { ShipContext } from '../../contexts/ShipProvider'

const RandomCelestBody = (props) => {

    const max = props.celest_body.length -1
    function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min) ) + min;
    }
    const randomNumber = getRndInteger(0,max);
    const celest_body = props.celest_body[randomNumber]

    return (
        <div className="bg__ctnr">
            <div className="random__celest__body" style={{
                backgroundColor: celest_body.primaryColor,
                boxShadow:
                    `inset 10px 0 40px #${celest_body.secondaryColor}, inset -10px 0 20px  #${celest_body.tertiaryColor}, inset -40px 10px 110px #${celest_body.quaternaryColor}`,
                width: '120vh',
                height: '120vh',
                animationDuration: '180s',
            }}>

            </div>
            <div className="celest__body_name">
                {celest_body.name}
              </div>
        </div>
    )
};

RandomCelestBody.contextType = ShipContext;

export default RandomCelestBody;