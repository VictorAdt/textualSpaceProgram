import React from 'react';

const RocketStats = props => {
    console.log(props);
    return (
        <div className="RocketStats">
            <p> DeltaV: {props.context.deltaVByStage.reduce((a, b) => a + b, 0).toFixed(2)} m/s</p>
            <p> TWR: {isNaN(props.context.TWRByStage[0]) ? 0 : props.context.TWRByStage[0].toFixed(2) }</p>
            <p> Weight: {props.context.totalMass.toFixed(2)} Tons </p>
        </div>
    );
};

export default RocketStats;