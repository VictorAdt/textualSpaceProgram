import React from 'react';

const FromSurface = (props) => {
    return (
        !props.isLoading &&
        <div className="from__surface">
            <div className="container__button navitation__choice">
                <div onClick={() => {
                props.fromSurfaceToOrbit()
            }} className="button ship__save__button"> Go to orbit </div>
            </div>
        </div>
    );
};

export default FromSurface;