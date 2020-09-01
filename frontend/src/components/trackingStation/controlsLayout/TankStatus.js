import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Vulcain from './../../../assets/image/engines/Vulcain.svg'
import F1 from './../../../assets/image/engines/F-1.svg'
import Merlin from './../../../assets/image/engines/Merlin.svg'
import RD180 from './../../../assets/image/engines/RD-180.svg'
import RS25 from './../../../assets/image/engines/RS-25.svg'

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
                                    src={e.name === 'RS-25' ? RS25 : e.name === 'RD-180' ? RD180 : e.name === 'Merlin' ? Merlin : e.name === 'F-1' ? F1 : Vulcain

                                    } />
                            ))}
                        </Row>
                    </div>
                ))
                }
            </Col >
        );
};

export default TankStatus;