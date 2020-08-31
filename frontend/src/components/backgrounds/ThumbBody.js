import React from 'react';

const Background = (props) => {
    let target = props.target

    if (target.celest_body === null) {
        target = props.target
    }
    return (
        <div className={`bg__ctnr ${props.isLoading ? 'disNone' : ''}`}>
            <div className={`round_bg thumb_body`} style={{
                backgroundColor: 
                    '#' + target.primaryColor,
                boxShadow:
                    `inset 10px 0 40px #${target.secondaryColor}, 
                    inset -10px 0 20px  #${target.tertiaryColor}, 
                    inset -40px 10px 110px #${target.quaternaryColor}`,
                width: '100px',
                height: '100px',
                animationDuration: '180s',
            }}>
            </div>
        </div>
    )
};


export default Background;