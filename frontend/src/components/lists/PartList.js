import React, { Component } from 'react';
import TankList from './../trackingStation/controlsLayout/TankList';
import EngineList from './EngineList';
import Col from './../../../node_modules/react-bootstrap/Col'
import Row from './../../../node_modules/react-bootstrap/Row'



export default class PartList extends Component {
    state = {
    }

    render() {

        return (
            <Row xs={12} className="PartList">
                <Col xs={12} xl={5} className="partlist_col">
                    <TankList setPart={this.props.setPart} addPart={this.props.addPart} />
                </Col>
                <Col xs={0} lg={1}>
                </Col>
                <Col xs={12} xl={5} className="partlist_col">
                    <EngineList addPart={this.props.addPart} />
                </Col>
            </Row>
        );
    }
}