import React, { Component } from 'react';
import PartList from './../lists/PartList'
import Accordion from './../../../node_modules/react-bootstrap/Accordion'
import Col from './../../../node_modules/react-bootstrap/Col'
import Card from './../../../node_modules/react-bootstrap/Card'


export default class StagesOverview extends Component {
    render() {
        if (this.props.stage === undefined) {
            return 'loading'
        } else
            return (
                <Col xs={12} className="stagesOverview">
                    <Col>
                        <button onClick={() => this.props.addStage()}> add stage </button>
                    </Col>
                    <Accordion defaultActiveKey="0">
                        {this.props.stage.map((e, i) => (
                            <div>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} key={i} eventKey={`${i}`} onClick={() => this.props.setCurrentStage(i)}>
                                        <h4>Stage {i + 1}</h4>
                                        {this.props.deltaVByStage &&
                                            <p> Stage delta V: {this.props.deltaVByStage[i]}</p>
                                        }
                                    </Accordion.Toggle>
                                </Card>
                                <Card>
                                    <Accordion.Collapse eventKey={`${i}`}>
                                        <Card.Body>
                                            <div>
                                                {this.props.stage[i].engine.map((e, index) => (
                                                    <div className="engine__name" key={index}>
                                                        <button onClick={() => this.props.deletePart(index, 'engine')}>Delete part</button>
                                                        <p>{e.name}</p>
                                                    </div>
                                                ))}
                                                {this.props.stage[i].tank.map((e, index) => (
                                                    <div className="tank__name" key={index}>
                                                        <button onClick={() => this.props.deletePart(index, 'tank')}>Delete part</button>
                                                        <p>{e.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <PartList addPart={this.props.addPart} />
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </div>
                        ))}
                    </Accordion>
                </Col>
            );
    }
}