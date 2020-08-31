import React, { Component } from 'react';
import { ShipContext } from './../../../../contexts/ShipProvider'
import axios from 'axios';
import InterfaceForControl from './InterfaceForControl'
import ShipOverView from './../ShipOverView'
import ShipStatus from './../ShipStatus'
import PlanetStatus from './../PlanetStatus';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class ShipControl extends Component {
    state = {
        ship: this.context.state.ship,
        celestialBody: null,
        stage: null,
        isLoading: false,
        failedMsg: null,
    }

    async componentDidMount() {
        
        if (this.props.location.ship) {
            let fetchedShip = this.props.location.ship

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

        } else {
            // redirect to home
            window.location.pathname = '/'
        }
    }

    setFailedMsg = msg => {
        this.setState({ failedMsg: msg })
    }

    render() {
        if (this.state.stage)
            return (
                <div>
                    <div style={{
                        opacity: this.state.failedMsg === null ? '0' : setTimeout(() => { return '1' }, 1000)
                    }} className="failed">
                        <p>{this.state.failedMsg}</p>
                    </div>
                    <Row xs={12} className="ship__control">
                        <Col className="status__infos" xs={12} lg={3}
                            style={{
                                opacity: this.context.state.menuOpen ? 0 : 1,
                                pointerEvents: this.context.state.menuOpen ? 'auto' : 'none',
                            }}>
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
                        </Col>
                        <Col xs={12} lg={6}>
                            <InterfaceForControl
                                menuOpen={this.context.state.menuOpen}
                                stage={this.state.stage}
                                setIsLoading={this.context.setIsLoading}
                                isLoading={this.context.state.isLoading}
                                setFailedMsg={this.setFailedMsg}
                            />
                        </Col>
                        <Col xs={12} lg={3}
                            style={{
                                opacity: this.context.state.menuOpen ? 0 : 1,
                                pointerEvents: this.context.state.menuOpen ? 'auto' : 'none',
                            }}>
                            <ShipOverView
                                ship={this.context.state.ship}
                                stage={this.state.stage}
                                setIsLoading={this.context.setIsLoading}
                                isLoading={this.context.state.isLoading}
                            />
                        </Col>
                    </Row>
                </div>

            )
        else return null
    }
}

ShipControl.contextType = ShipContext;
