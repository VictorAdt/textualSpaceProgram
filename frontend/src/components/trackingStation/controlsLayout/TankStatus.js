import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const TankStatus = props => {
    if (props.stage)
        return (
            <Col xs={12} className={"tanks__status"}>
                {props.stage.map((e, i) => (
                    <div key={i} xs={12} 
                        className={e.tank[0].remainingFuel === 0 ? 
                        'separation' : ''}>
                        {e.tank.map((e, i) => (
                            <div className="tank__name" key={i}>
                                <div style={{
                                    height: e.size === 'small' ? '10px' :
                                    e.size === 'medium' ? '40px' : '60px'
                                }}
                                    className="tank">
                                    <div
                                        style={{
                                            width: e.remainingFuel / e.maxFuel * 100 + '%',
                                            backgroundColor: '#fff',
                                            height: '100%',
                                            display: 'block',
                                            transition: e.remainingFuel < e.maxFuel ? 'width 2s ease-in-out' : ''
                                        }}
                                    >
                                    </div>
                                    <div className="tank__line"> </div>
                                </div>
                            </div>
                        ))}
                        <Row xs={12} className="engine__thumb__ctnr">
                            {e.engine.map((e, i) => (
                                <img 
                                    alt={`${e.name} pictogram`} 
                                    key={i} className="engine__thumb" 
                                    src={`http://localhost:1337${e.thumb.url}`} />
                            ))}
                        </Row>
                    </div>
                ))
                }
            </Col >
        );
};

export default TankStatus;