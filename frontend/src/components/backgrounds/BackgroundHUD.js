import React from 'react';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Col'
import R from './../../assets/image/HUD bg/r.svg'
import L from './../../assets/image/HUD bg/l.svg'


const BackgroundHUD = () => {
    return (
        <Row xs={12} className="backgroundHUD">
            <Col xs={3} className="backgroundHUD__L" style={{backgroundImage: `url(${L})`}} />
            <Col xs={6} />
            <Col xs={3} className="backgroundHUD__L" style={{backgroundImage: `url(${R})`}} />
        </Row>
    );
};

export default BackgroundHUD;