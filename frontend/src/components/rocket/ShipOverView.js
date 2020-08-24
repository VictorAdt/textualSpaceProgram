import React from 'react';
import TankStatus from './TankStatus';

const ShipOverView = (props) => {
    if (props.stage)
        return (
            <div className="ship__overview">
                <div className={`${props.isLoading === true ?  'shaking' : ''} TankStatus`}>
                    <TankStatus
                        stage={props.stage}
                    />
                </div>
            </div>
        );
    else return ''
};

export default ShipOverView;