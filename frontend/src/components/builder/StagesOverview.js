import React, { Component } from 'react';
import PartList from './../lists/PartList'
import Accordion from './../../../node_modules/react-bootstrap/Accordion'
import Col from './../../../node_modules/react-bootstrap/Col'
import Card from './../../../node_modules/react-bootstrap/Card'
import Row from './../../../node_modules/react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import tank_bg from './../../assets/image/tank_bg.svg'



export default class StagesOverview extends Component {
    state = {
        part: null,
    }

    setPart = part => {
        console.log('set')
        this.setState({ part: part })
    }


    render() {
        if (this.props.stage === undefined) {
            return 'loading'
        } else
            return (
                <Row fluid className="stagesOverview" xs={12} >
                    <Col xs={12}>
                        <Col xs={12} className="stages">
                            {this.props.stage.map((e, i) => (
                                <div className={this.props.currentStage === i ? 'active__stage' : 'no__active__stage'}>
                                    <div className="stage" onClick={() => this.props.setCurrentStage(i)}>
                                        <p>
                                            stage {i + 1}
                                        </p>
                                        {this.props.stage.length >= 1 &&
                                            <Button variant="dark" onClick={() => this.props.deleteStage(i)}>-</Button>}
                                    </div>
                                </div>
                            ))}
                            <div className="addstage__button">
                                <h3>New stage</h3>
                                <Button variant="light" className="addStage" onClick={() => this.props.addStage()}> + </Button>
                            </div>
                        </Col>
                    </Col>
                    <Col xs={12} className="rocket__stages builder__tools">
                        {this.props.stage.map((e, i) => (
                            <div className="stage__card">
                                <p className={`stage__nb ${this.props.massSum[i] > 0 ? '' : 'disNone'}`}>{i + 1}</p>
                                <div className="tank__ctnr">
                                    {this.props.stage[i].tank.map((e, index) => (
                                        <div className="tank__name" key={index}>
                                            <Button variant="light" onClick={() => this.props.deletePart(index, i, 'tank')}>-</Button>
                                            <div style={{
                                                height: e.size === 'small' ? '50px' : e.size === 'medium' ? '100px' : '150px',
                                                backgroundImage: `url("${tank_bg}")`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: `contain`
                                            }}
                                                className="tank">
                                                <div className="tank__line"> </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="engine__ctnr" >
                                    {this.props.stage[i].engine.map((e, index) => (
                                        <div className="engine__name" key={index}>
                                            <Button variant="light" onClick={() => this.props.deletePart(index, i, 'engine')}>-</Button>
                                            <img className="engine__thumb" src={`http://localhost:1337${e.thumb.url}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>
            );
    }
}