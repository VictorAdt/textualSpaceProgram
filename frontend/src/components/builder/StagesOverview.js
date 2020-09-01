import React, { Component } from 'react';
import Col from './../../../node_modules/react-bootstrap/Col'
import Row from './../../../node_modules/react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import tank_bg from './../../assets/image/tank_bg.svg'
import Vulcain from './../../assets/image/engines/Vulcain.svg'
import F1 from './../../assets/image/engines/F-1.svg'
import Merlin from './../../assets/image/engines/Merlin.svg'
import RD180 from './../../assets/image/engines/RD-180.svg'
import RS25 from './../../assets/image/engines/RS-25.svg'

export default class StagesOverview extends Component {
    state = {
        part: null,
    }

    setPart = part => {
        this.setState({ part: part })
    }


    render() {
        if (this.props.stage === undefined) {
            return 'loading'
        } else
            return (
                <Row fluid="true" className="stagesOverview" xs={12} >
                    <Col xs={12}>
                        <Col xs={12} className="stages">
                            {this.props.stage.map((e, i) => (
                                <div key={i} className={this.props.currentStage === i ? 'active__stage' : 'no__active__stage'}>
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
                            <div key={i} className="stage__card">
                                <p className={`stage__nb ${this.props.totalMassArray[i] > 0 ? '' : 'disNone'}`}>{i + 1}</p>
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
                                            {
                                            <img alt={`${e.name} pictogram`} className="engine__thumb" src={e.name === 'RS-25' ? RS25 : e.name === 'RD-180' ? RD180 : e.name === 'Merlin' ? Merlin : e.name === 'F-1' ? F1 : Vulcain} />}
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