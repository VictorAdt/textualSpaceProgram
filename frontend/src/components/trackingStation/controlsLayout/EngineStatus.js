import React from 'react';

const EngineStatus = props => {
    return (
        <div className="enigne__status">
            {props.stage.map((e, i) => (
                <div key={i}>
                    s
                </div>
            ))}
        </div>
    );
};

export default EngineStatus;