import React, { Component } from 'react';
import { ShipContext } from './../contexts/ShipProvider'
import RocketStats from '../components/rocket/RocketStats'
import StagesOverview from './../components/builder/StagesOverview'
import NameShip from '../components/builder/NameShip';
import SaveShip from '../components/builder/SaveShip';
import SolarSystem from '../components/animation/SolarSystem';
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import PartList from '../components/lists/PartList';

class Builder extends Component {
    state = {
        stage: [{
            engine: [],
            tank: [],
        }
        ],
        alert: { 
            msg: null, 
            variant: '',
        },
        currentStage: 0,
    }

    async componentDidMount() {
        /*reset ship context*/
        this.context.shipSetStage({
            stage: [{
                engine: [],
                tank: [],
            }]
        })
    }

    /*handle name input*/
    handleChange = e => {
        console.log(e.target.name, e.target.value);
        this.setState({ [e.target.name]: e.target.value })
    }

    /*set error msg if ship is not ok for save*/
    setErrorMsg = (msg, variant) => {
        this.setState({ alert: { msg: msg, variant: variant } })
    }

    /*add stage*/
    addStage = () => {
        const stage = this.state.stage
        stage.push({
            engine: [],
            tank: [],
        });
        this.setState({ stage: stage })
    }

    /*set the current stage to add part*/
    setCurrentStage = index => {
        this.setState({ currentStage: index })
    }

    /*add part to a stage*/
    addPart = (part, partType) => {
        const currentStage = this.state.currentStage
        const stage = this.state.stage
        if (!stage[currentStage]) {
            return
        }
        console.log(part);
        if (partType === 'tank') { stage[currentStage].tank.push(part) }
        if (partType === 'engine') { stage[currentStage].engine.push(part) }
        this.setState({ stage: stage }, () => {
            this.context.shipSetStage(stage)
        })
    }
    
    /*delete part*/
    deletePart = (partIndex, stageIndex, partType) => {
        const stage = this.state.stage
        const currentStage = stageIndex
        if (partType === 'tank') {
            stage[currentStage].tank.splice(partIndex, 1)
        }
        else if (partType === 'engine') {
            stage[currentStage].engine.splice(partIndex, 1)
        }
        this.setState({ stage: stage }, () => {
            this.context.shipSetStage(stage)
        })
    }

    /*delete stage*/
    deleteStage = stageIndex => {
        const stage = this.state.stage
        stage.splice(stageIndex, 1)
        this.setCurrentStage(0)
        this.setState({ stage: stage }, () => {
            this.context.shipSetStage(stage)
        })
    }

    render() {
        const stage = this.state.stage
        const value = this.context
        if (!this.context.state.menuOpen) {
            return (
                <div className="builder__container">
                    <Alert variant={this.state.alert.variant} className={this.state.alert.msg === null ? 'disNone' : ''}>
                        {this.state.alert.msg}
                    </Alert>
                    <Row xs={12}>
                        <Col xs={12}>
                            <NameShip
                                handleInput={this.handleChange}
                            />
                        </Col>
                    </Row>
                    <Row xs={12} className="builder__content__ctnr">
                        <Col xs={12} md={6} lg={4}>
                            <Row>
                                <RocketStats context={this.context.state} />
                            </Row>
                            <Row>
                                <StagesOverview
                                    deleteStage={this.deleteStage}
                                    addStage={this.addStage}
                                    setCurrentStage={this.setCurrentStage}
                                    stage={stage}
                                    addPart={this.addPart}
                                    deltaVByStage={this.context.state.deltaVByStage}
                                    deletePart={this.deletePart}
                                    currentStage={this.state.currentStage}
                                    massSum={this.context.state.massSum}
                                />
                            </Row>
                        </Col>
                        <Col xs={12} md={6} lg={8}>
                            <PartList
                                addPart={this.addPart}
                            />
                        </Col>
                    </Row>
                    <SaveShip
                        stage={stage}
                        name={this.state.name}
                        bodyLocation={2}
                        locationStatus={'ground'}
                        setErrorMsg={this.setErrorMsg}
                        TWRByStage={this.context.state.TWRByStage}
                    />
                    {this.props.celestBodies &&
                        <SolarSystem
                            celestBodies={this.props.celestBodies}
                        />}
                </div>
            )
        } else return (this.props.celestBodies &&
            <SolarSystem
                celestBodies={this.props.celestBodies}
            />)
    }
}

Builder.contextType = ShipContext;

export default Builder;

