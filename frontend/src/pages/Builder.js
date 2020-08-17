import React, { Component } from 'react';
import { ShipContext } from './../contexts/ShipProvider'
import RocketStats from '../components/rocket/RocketStats'
import StagesOverview from './../components/builder/StagesOverview'
import NameShip from '../components/builder/NameShip';
import SaveShip from '../components/builder/SaveShip';
import SolarSystem from '../components/animation/SolarSystem';
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'

class Builder extends Component {
    state = {
        stage: [{
            engine: [],
            tank: [],
        }
        ],
        alert: {msg: null, variant: ''},
        currentStage: 0,
        celestBodies: null,
    }

    async componentDidMount() {
        this.context.shipSetStage({
            stage: [{
                engine: [],
                tank: [],
            }]
        })

        try {
            const celestBodiesRes = await axios({
                method: 'GET',
                url: `/celest-bodies`
            })
            const fetchedCelestBodies = celestBodiesRes.data
            this.setState({celestBodies: fetchedCelestBodies})
        } catch (e) {
            alert(e)
        }
    }

    handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({ [e.target.name]: e.target.value })
        console.log('name', this.state.name)
    }

    setErrorMsg = (msg, variant) => {
        this.setState({alert: {msg: msg, variant: variant}})
    }

    addStage = () => {
        const stage = this.state.stage
        stage.push({
            engine: [],
            tank: [],
        });
        this.setState({ stage: stage })
        console.log('this.state.stage', this.state.stage)
        console.log('this.props.deltaVByStage', this.props.deltaVByStage);
    }

    setCurrentStage = index => {
        this.setState({ currentStage: index })
        console.log('currentstate', this.state.currentStage);
    }

    addPart = (part, partType) => {
        const currentStage = this.state.currentStage
        const stage = this.state.stage
        if(!stage[currentStage]){
            return
        }
        console.log(part);
        if (partType === 'tank') { stage[currentStage].tank.push(part) }
        if (partType === 'engine') { stage[currentStage].engine.push(part) }
        this.setState({ stage: stage }, () => {
            this.context.shipSetStage(stage)
        })

        console.log('Builder this.state.stage', this.state.stage)
    }

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

    deleteStage = stageIndex => {
        const stage = this.state.stage
        stage.splice(stageIndex, 1)
        this.setCurrentStage(0)
        this.setState({ stage: stage}, () => {
            this.context.shipSetStage(stage)
        })
    }

    render() {
        const stage = this.state.stage
        const value = this.context
        if(!this.context.state.menuOpen){
        return (
            <div className="builder__container">
                <Alert variant={this.state.alert.variant} className={ this.state.alert.msg === null ? 'disNone' : ''}>
                    {this.state.alert.msg}
                </Alert>
                <NameShip
                    handleInput={this.handleChange}
                />
                <RocketStats context={this.context.state} />
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
                <SaveShip
                    stage={stage}
                    name={this.state.name}
                    bodyLocation={2}
                    locationStatus={'ground'}
                    setErrorMsg={this.setErrorMsg}
                />
                {this.state.celestBodies &&
                <SolarSystem 
                    celestBodies={this.state.celestBodies}
                />}
            </div>
        )} else return (this.state.celestBodies &&
            <SolarSystem 
                celestBodies={this.state.celestBodies}
            />)
    }
}

Builder.contextType = ShipContext;

export default Builder;

