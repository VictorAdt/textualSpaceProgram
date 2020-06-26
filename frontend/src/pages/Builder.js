import React, { Component } from 'react';
import { ShipContext } from './../contexts/ShipProvider'
import RocketStats from '../components/rocket/RocketStats'
import StagesOverview from './../components/builder/StagesOverview'
import NameShip from '../components/builder/NameShip';
import SaveShip from '../components/builder/SaveShip';

class Builder extends Component {
    state = {
        stage: [{
            commandModule: [],
            engine: [],
            tank: [],
        }
        ],
        currentStage: 0,
    }

    componentDidMount(){
        this.context.shipSetStage(this.state.stage)
    }

    handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({ [e.target.name]: e.target.value })
    }

    addStage = () => {
        const stage = this.state.stage
        stage.push({
            commandModule: [],
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
        if (partType === 'tank') { stage[currentStage].tank.push(part) }
        if (partType === 'engine') { stage[currentStage].engine.push(part) }
        if (partType === 'command-module') { stage[currentStage].commandModule.push(part) }
        this.setState({ stage: stage }, () => {
            this.context.shipSetStage(stage)
        })
        
        console.log('Builder this.state.stage', this.state.stage)
    }

    render() {
        const currentStage = this.state.currentStage
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
                    <h2> current stage :{(currentStage + 1)}</h2>
                    <RocketStats shipWeight={value.state.totalMass} deltaV={value.state.deltaV} />
                    <StagesOverview
                        addStage={this.addStage}
                        setCurrentStage={this.setCurrentStage}
                        stage={stage}
                        addPart={this.addPart}
                        deltaVByStage={value.state.deltaVByStage}
                    />
                </div>
        );
    }
}

Builder.contextType = ShipContext;

export default Builder;

