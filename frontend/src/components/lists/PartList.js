import React, { Component } from 'react';
import TankList from './TankList';
import EngineList from './EngineList';
import Col from './../../../node_modules/react-bootstrap/Col'
import Row from './../../../node_modules/react-bootstrap/Row'



export default class PartList extends Component {
    state = {
    }

    render() {

        return (
            <Row xs={12} className="PartList">
                <Col xs={6}>
                    <TankList setPart={this.props.setPart} addPart={this.props.addPart} />
                </Col>
                <Col xs={6}>
                    <EngineList addPart={this.props.addPart} />
                </Col>
            </Row>
        );
    }
}