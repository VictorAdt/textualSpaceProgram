import React from 'react';
import styled from 'styled-components'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'



const TankStatus = props => {
    if (props.stage)
        return (
            <Col xs={12} className={"tanks__status"}>
                {props.stage.map((e, i) => (
                    <div key={i} xs={12} className={e.tank[0].remainingFuel === 0 ? 'separation' : ''}>
                        <Row xs={12}>
                            <p className="rmnful">Remaining fuel</p>
                        </Row>
                        <Row className="fuel__engine" xs={12} >
                            <div key={i} className="engine__status" >
                                {e.engine.map((e, i) => (
                                    <div xs={1}>
                                        <img className="engine__image" src={'http://localhost:1337' + e.image.formats.medium.url} />
                                    </div>
                                ))}
                            </div>

                            {e.tank.map((e, i) => (

                                <div key={i} className="extern__fuel__bar">
                                    <div className="intern__fuel__bar"
                                        style={{
                                            width: e.remainingFuel / e.maxFuel * 100 + '%',
                                            transition: e.remainingFuel < e.maxFuel ? 'width 2s ease-in-out' : ''
                                        }}
                                    >
                                    </div>
                                </div>
                            ))}
                        </Row>

                    </div>
                ))}
            </Col >
        );
};

export default TankStatus;