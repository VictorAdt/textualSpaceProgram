import React from 'react';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Col'
import R from './../../assets/image/HUD bg/r.svg'
import L from './../../assets/image/HUD bg/l.svg'


const BackgroundHUD = () => {
    return (
        <Row xs={12} className="backgroundHUD">
            <Col xs={3}>
                <img src={L} />
            </Col>
            <Col xs={6} />
            <Col xs={3}>
                <img src={R} />
            </Col>
        </Row>
    );
};

export default BackgroundHUD;