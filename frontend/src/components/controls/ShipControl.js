import React, { Component } from 'react';
import { ShipContext } from '../../contexts/ShipProvider'
import axios from 'axios';
import ManoeuvreControl from './ManoeuvreControl'
import ShipOverView from './../rocket/ShipOverView'
import ShipStatus from './../rocket/ShipStatus'
import PlanetStatus from '../rocket/PlanetStatus';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
                    url: `/ships/${this.props.location.id}`
                });
                const fetchedShip = shiptRes.data

                const celestBodyRes = await axios({
                    method: 'GET',
                    url: `/celest-bodies/${fetchedShip.celest_body.id}`
                })
                const fetchedCelestBody = celestBodyRes.data
                fetchedShip.celest_body = fetchedCelestBody
                this.context.setShip(fetchedShip)


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
                this.setState({
                    stage: rocketStages
                })

                console.log('fetchedShip', fetchedShip)
                // Catch error
            } catch (err) {
                alert(err)
            }

        } else {
            // redirect to home
            window.location.pathname = '/'
        }
    }

    render() {
        if (this.state.stage)
            return (
                <Row xs={12} className="ship__control">
                    <Col className="status__infos" xs={3}>
                        {!this.context.state.menuOpen &&
                            <div>
                                <ShipStatus
                                    context={this.context.state}
                                    setIsLoading={this.context.setIsLoading}
                                    isLoading={this.context.state.isLoading}
                                />
                                <PlanetStatus
                                    ship={this.context.state.ship}
                                    setIsLoading={this.context.setIsLoading}
                                    isLoading={this.context.state.isLoading}
                                />
                            </div>
                        }
                    </Col>


                    <Col xs={6}>
                        <ManoeuvreControl
                            menuOpen={this.context.state.menuOpen}
                            stage={this.state.stage}
                            setIsLoading={this.context.setIsLoading}
                            isLoading={this.context.state.isLoading}
                        />
                    </Col>


                    <Col xs={3}>
                        {!this.context.state.menuOpen &&
                            <ShipOverView
                                ship={this.context.state.ship}
                                stage={this.state.stage}
                                setIsLoading={this.context.setIsLoading}
                                isLoading={this.context.state.isLoading}
                            />
                        }
                    </Col>

                </Row>
            )
        else return null
    }
}

ShipControl.contextType = ShipContext;
