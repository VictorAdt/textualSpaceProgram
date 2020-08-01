import React, { Component } from 'react';
import { ShipContext } from './../contexts/ShipProvider'
import RocketStats from '../components/rocket/RocketStats'
import StagesOverview from './../components/builder/StagesOverview'
import NameShip from '../components/builder/NameShip';
import SaveShip from '../components/builder/SaveShip';
import axios from 'axios';
import SolarSystem from '../components/animation/SolarSystem';

class Builder extends Component {
    state = {
        stage: [{
            engine: [],
            tank: [],
        }
        ],
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
    }

    handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({ [e.target.name]: e.target.value })
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
        console.log(part);
        if (partType === 'tank') { stage[currentStage].tank.push(part) }
        if (partType === 'engine') { stage[currentStage].engine.push(part) }
        this.setState({ stage: stage }, () => {
            this.context.shipSetStage(stage)
        })

        console.log('Builder this.state.stage', this.state.stage)
    }

    deletePart = (partIndex, partType) => {
        const stage = this.state.stage
        const currentStage = this.state.currentStage
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

    render() {
        const stage = this.state.stage
        const value = this.context
        if(!this.context.state.menuOpen){
        return (
            <div className="builder__container">
                <NameShip
                    handleInput={this.handleChange}
                />
                <RocketStats context={this.context.state} />
                <StagesOverview
                    addStage={this.addStage}
                    setCurrentStage={this.setCurrentStage}
                    stage={stage}
                    addPart={this.addPart}
                    deltaVByStage={this.context.state.deltaVByStage}
                    deletePart={this.deletePart}
                    currentStage={this.state.currentStage}
                />
                <SaveShip
                    stage={stage}
                    name={this.state.name}
                    bodyLocation={2}
                    locationStatus={'ground'}
                />*/
            </div>
        )} else return null
    }
}

Builder.contextType = ShipContext;

export default Builder;

