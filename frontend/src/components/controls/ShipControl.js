import React, { Component } from 'react';
import { ShipContext } from '../../contexts/ShipProvider'
import axios from 'axios';
import ManoeuvreControl from './ManoeuvreControl'
import ShipOverView from './../rocket/ShipOverView'
import ShipStatus from './../rocket/ShipStatus'
import PlanetStatus from '../rocket/PlanetStatus';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Background from './../Background'

export default class ShipControl extends Component {
    state = {
        ship: this.context.state.ship,
        celestialBody: null,
        stage: null,
        isLoading: false
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
                    currentStage++
                    rocketStages.push(stage)
                }

                this.context.shipSetStage(rocketStages)
                this.context.setShip(fetchedShip)
                this.setState({
                    stage: rocketStages
                })

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

    setIsLoading = (bool) => {
        this.setState({ isLoading: bool })
    }

    render() {
        if (this.state.stage)
            return (
                <Row xs={12} className="ship__control">

                    <Background isLoading={this.state.isLoading} />
                    
                    <Col xs={4}>
                        <ShipStatus
                            context={this.context.state}
                            setLoading={this.setIsLoading}
                            isLoading={this.state.isLoading}
                        />
                        <PlanetStatus
                            ship={this.context.state.ship}
                            setLoading={this.setIsLoading}
                            isLoading={this.state.isLoading}
                        />
                    </Col>


                    <Col xs={4}>
                        <ManoeuvreControl
                            stage={this.state.stage}
                            setLoading={this.setIsLoading}
                            isLoading={this.state.isLoading}
                        />
                    </Col>

                    <Col xs={4}>
                        <ShipOverView
                            ship={this.context.state.ship}
                            stage={this.state.stage}
                            setLoading={this.setIsLoading}
                            isLoading={this.state.isLoading}
                        />
                    </Col>
                </Row>
            )
        else return null
    }
}

ShipControl.contextType = ShipContext;
