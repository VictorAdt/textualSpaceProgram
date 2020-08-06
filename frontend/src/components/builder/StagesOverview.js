import React, { Component } from 'react';
import PartList from './../lists/PartList'
import Accordion from './../../../node_modules/react-bootstrap/Accordion'
import Col from './../../../node_modules/react-bootstrap/Col'
import Card from './../../../node_modules/react-bootstrap/Card'
import Row from './../../../node_modules/react-bootstrap/Row'
import Button from 'react-bootstrap/Button'


export default class StagesOverview extends Component {

    render() {
        if (this.props.stage === undefined) {
            return 'loading'
        } else
            return (
                <Row xs={12} className="stagesOverview">
                    <Col xs={1}>
                        <Button variant="light" className="addStage" onClick={() => this.props.addStage()}> + </Button>
                    </Col>
                    <Col xs={6}>
                        <Accordion defaultActiveKey="0">
                            {this.props.stage.map((e, i) => (
                                <div className="stage__card">
                                    <Card>
                                        <Accordion.Toggle className={this.props.currentStage === i ? 'active_stage' : ''} as={Card.Header} key={i} eventKey={`${i}`} onClick={() => this.props.setCurrentStage(i)}>
                                            <h4>Stage {i + 1}</h4>
                                            {this.props.deltaVByStage &&
                                                <p> Stage delta V: {this.props.deltaVByStage[i]}</p>
                                            }
                                            {this.props.stage.length > 1 &&
                                            <Button variant="dark" onClick={() => this.props.deleteStage(i) }> Delete stage</Button>}
                                        </Accordion.Toggle>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey={`${i}`}>
                                            <Card.Body className={this.props.currentStage === i ? 'active_stage' : ''}>
                                                <div className="drop__zone">
                                                    {this.props.stage[i].engine.map((e, index) => (
                                                        <div className="engine__name" key={index}>
                                                            <Button onClick={() => this.props.deletePart(index, 'engine')}>Delete part</Button>
                                                            <p>{e.name}</p>
                                                        </div>
                                                    ))}
                                                    {this.props.stage[i].tank.map((e, index) => (
                                                        <div className="tank__name" key={index}>
                                                            <Button onClick={() => this.props.deletePart(index, 'tank')}>Delete part</Button>
                                                            <p>{e.name}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </div>
                            ))}
                        </Accordion>
                    </Col>
                    <Col xs={5}>
                        <PartList addPart={this.props.addPart} />
                    </Col>
                </Row>
            );
    }
}