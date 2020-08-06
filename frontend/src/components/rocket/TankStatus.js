import React from 'react';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



const TankStatus = props => {
    if (props.stage)
        return (
            <Col xs={12} className={"tanks__status"}>
            {props.stage.map((e, i) => (
                <div key={i} xs={12}  className={ e.tank[0].remainingFuel === 0 ? 'separation' : ''}>
                    <Row xs={12}>
                        {e.engine.map((e, i) => (
                            <Col key={i} >
                                <p>{e.name}</p>
                            </Col>
                        ))}
                    </Row>
                    {e.tank.map((e, i) => (
                        <div key={i} 
                            style={{
                                width: '80%',
                                border: '1px solid #6D6D6D',
                                backgroundColor: '#E5E5E5',
                                height: '20px',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                margin: '10px 0px',
                            }}>
                            <div 
                                style={{
                                    width: e.remainingFuel / e.maxFuel * 100 + '%',
                                    backgroundColor: '#6D6D6D',
                                    height: '100%',
                                    display: 'block',
                                    transition: e.remainingFuel < e.maxFuel ? 'width 2s ease-in-out' : ''
                                }}
                            >
                            </div>
                        </div>
                    ))}
                </div>
            ))
            }
        </Col >
        );
};

export default TankStatus;