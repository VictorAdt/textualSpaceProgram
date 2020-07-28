import React, { useContext } from 'react';
import { ShipContext } from './../contexts/ShipProvider'

const Background = (props) => {
    const context = useContext(ShipContext)
    if (context.state.ship.locationStatus !== undefined)
        return (
            <div style={{
                backgroundColor: props.isLoading === true ? '#E5E5E5' : '#E5E5E5', 
                transition: '3s ease-in',
                top: 0,
                left: 0,
                position: "absolute",
                width: '100vw',
                height: '100%',
                zIndex: '-100',
            }} className="background" >
            </div>
        )
    else return null
};

Background.contextType = ShipContext;

export default Background;