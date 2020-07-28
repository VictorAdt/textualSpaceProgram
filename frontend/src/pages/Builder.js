import React, { Component } from 'react';
import { ShipContext } from './../contexts/ShipProvider'
import RocketStats from '../components/rocket/RocketStats'
import StagesOverview from './../components/builder/StagesOverview'
import NameShip from '../components/builder/NameShip';
import SaveShip from '../components/builder/SaveShip';

class Builder extends Component {
    state = {
        stage: [{
            engine: [],
            tank: [],
        }
        ],
        currentStage: 0,
    }

    componentDidMount() {
        this.context.shipSetStage(this.state.stage)
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
        return (
            <div className="builder__container">
                <NameShip
                    handleInput={this.handleChange}
                />
                <SaveShip
                    stage={stage}
                    name={this.state.name}
                    bodyLocation={2}
                    locationStatus={'ground'}
                />
                <RocketStats shipWeight={value.state.totalMass} deltaV={this.context.state.deltaVByStage} />
                <StagesOverview
                    addStage={this.addStage}
                    setCurrentStage={this.setCurrentStage}
                    stage={stage}
                    addPart={this.addPart}
                    deltaVByStage={this.context.state.deltaVByStage}
                    deletePart={this.deletePart}
                />
            </div>
        );
    }
}

Builder.contextType = ShipContext;

export default Builder;

