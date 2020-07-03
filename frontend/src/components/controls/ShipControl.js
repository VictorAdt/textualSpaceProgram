import React, { Component } from 'react';
import { ShipContext } from '../../contexts/ShipProvider'
import axios from 'axios';
import ManoeuvreControl from './ManoeuvreControl';
import ShipOverView from './../rocket/ShipOverView';

export default class ShipControl extends Component {
    state = {
        ship: this.context.state.ship,
        stage: this.context.state.stage,
        celestialBody: null
    }

    async componentDidMount() {
        if (this.props.location.id) {
            try {
                const shiptRes = await axios({
                    method: 'GET',
                    url: `http://localhost:1337/ships/${this.props.location.id}`
                });
                const fetchedShip = shiptRes.data
                let rocketStages = []
                // format data for the context
                for (let i = 0; i < fetchedShip.stage.length; i++) {
                    let stage = {
                        commandModule: [],
                        engine: [],
                        tank: [],
                    }
                    let currentStage = i
                    for (let i = 0; i < fetchedShip.stage[currentStage].tank.length; i++) {
                        fetchedShip.stage[currentStage].tank[i].tank.remainingFuel = parseInt(fetchedShip.stage[currentStage].tank[i].remaininFuel)
                        stage.tank.push(fetchedShip.stage[currentStage].tank[i].tank)
                    }
                    for (let i = 0; i < fetchedShip.stage[currentStage].engine.length; i++) {
                        stage.engine.push(fetchedShip.stage[currentStage].engine[i].engine)
                    }
                    for (let i = 0; i < fetchedShip.stage[currentStage].commandModule.length; i++) {
                        stage.commandModule.push(fetchedShip.stage[currentStage].commandModule[i].command_module)
                    }
                    currentStage++
                    rocketStages.push(stage)
                }
 
                this.context.shipSetStage(rocketStages)
                this.context.setShip(fetchedShip)

                console.log('fetchedShip', fetchedShip)
            // Catch error
            } catch (err) {
                alert(err);
            }

        } else {
            // redirect to home
            window.location.pathname = '/'
        }
    }

    render() {
        // if(this.context.state.ship)
        return (
            <div className="ship__control">
                <ManoeuvreControl 
                    // ship={this.context.state.ship}
                    // stage={this.context.state.stage}
                />
                <ShipOverView 
                    ship={this.context.state.ship}
                />
            </div>
        )
        // else return <div></div>
    }
}

ShipControl.contextType = ShipContext;
