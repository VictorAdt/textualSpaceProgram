import React, { Component } from 'react'
import { ShipContext } from '../../contexts/ShipProvider'
import { updateShip } from '../../utils/updateShip'
import { deleteShip } from '../../utils/deleteShip'
import FromSurface from './FromSurface'
import FromOrbit from './FromOrbit'
import axios from 'axios'

export default class ManoeuvreControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            stage: [],
        }
    }


    componentDidMount() {
        this.setState({
            stage: this.props.stage
        }, () => {
            console.log(this.state.stage, 'compdidmount');
        })
    }

    getFuelForDV = (dv, index) => {
        let summArr = this.context.state.massSum
        let fuelMassArray = this.context.state.fuelMassArray
        let dryMass = (summArr[index] - fuelMassArray[index])
        let wetMass = dryMass * Math.exp(dv / (9.82 * this.context.state.ispArray[index]))
        const fuelWeight = wetMass - dryMass
        const fuelAmount = fuelWeight / 0.01
        return fuelAmount
    }

    pause = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    burn = (requierdDV, risk, i) => {
        let stage = this.props.stage
        let dvByStageAfterBurn = this.context.state.deltaVByStage
        let index = i

        if (dvByStageAfterBurn[i] >= requierdDV) {
            dvByStageAfterBurn[i] -= requierdDV
            requierdDV = 0
            const lastStageRemainingFuel = this.getFuelForDV(dvByStageAfterBurn[i], i)
            for (let i = 0; i < stage[index].tank.length; i++) {
                stage[index].tank[i].remainingFuel = (lastStageRemainingFuel / stage[index].tank.length)
            }
        } else {
            requierdDV -= dvByStageAfterBurn[i]
            dvByStageAfterBurn[i] = 0
            for (let i = 0; i < stage[index].tank.length; i++) {
                stage[index].tank[i].remainingFuel = 0
            }
        }
        return { stage, requierdDV }

    }

    async getCelestBody(id) {
        try {
            const celestBodyRes = await axios({
                method: 'GET',
                url: `http://localhost:1337/celest-bodies/${id}`
            })
            const fetchedCelestBody = celestBodyRes.data
            return fetchedCelestBody
        } catch (e) {
            alert(e)
        }
    }

    fromSurfaceToOrbit = async () => {
        await this.props.setLoading(true)
        let requierdDV = Math.sqrt(this.context.state.ship.celest_body.mu / this.context.state.ship.celest_body.radius) * 1000 * this.context.state.ship.celest_body.atmosphere
        console.log('reqDV', requierdDV)
        let loop = this.props.stage.length
        let i = 0

        while (i < loop) {
            let burn = this.burn(requierdDV, true, i)
            if (burn.requierdDV === 0) {
                await this.pause(2000)
                this.context.shipSetStage(burn.stage)
                break
            }
            else if (burn.requierdDV > 0) {
                await this.pause(2000)
                this.context.shipSetStage(burn.stage)
                await this.pause(2000)
                burn.stage.splice(i, 1)
                await this.pause(1000)
                this.context.shipSetStage(burn.stage)
                i--
            }
            else if (burn === false) {
                console.log('crash')
                break
            }
            i++
        }
        const celest_body = await this.getCelestBody(this.context.state.ship.celest_body.id)
        this.context.updateLocation('orbit', celest_body)
        //save to database
        await updateShip(
            this.context.state.stage,
            this.context.state.ship.name,
            'orbit',
            celest_body.id,
            this.context.state.ship.id,
            celest_body.lowOrbit
        )
        this.props.setLoading(false)
    }


    fromOrbitToSurface = async () => {
        let requierdDV = Math.sqrt(this.context.state.ship.celest_body.mu / this.context.state.ship.celest_body.radius) * 1000 / this.context.state.ship.celest_body.atmosphere
        console.log('reqDV', requierdDV);
        let stage = this.burn(requierdDV, true)
        if (stage === false) {
            console.log('you crashed');
        } else {
            console.log('congrats, you landed');

            const celest_body = await this.getCelestBody(this.context.state.ship.celest_body.id)
            this.context.shipSetStage(stage)
            this.context.updateLocation('ground', celest_body)
            console.log('celest_body', celest_body);
            //save to database
            updateShip(
                stage,
                this.context.state.ship.name,
                'ground',
                celest_body.id,
                this.context.state.ship.id,
                celest_body.lowOrbit)
        }
    }

    escapeFromOrbit = async () => {
        let requierdDV = this.context.state.ship.celest_body.escapeVelocity
        console.log('reqDV', requierdDV);
        let stage = this.burn(requierdDV, true)
        if (stage === false) {
            console.log('you ran out of fuel, you are lost in space')
            // destroy ship
        } else {
            console.log('congrats, you escaped Kerbin system influence, you are now orbiting around Kerbol')

            //stage update
            const celest_body = await this.getCelestBody(this.context.state.ship.celest_body.id)
            this.context.updateLocation('orbit', celest_body.childrens[0])
            this.context.shipSetStage(stage)
            console.log('celest_body.childrens[0]', celest_body.childrens[0]);
            //save to database
            updateShip(
                stage,
                this.context.state.ship.name,
                'orbit',
                celest_body.childrens[0].id,
                this.context.state.ship.id,
                celest_body.apoapsis
            )
        }
    }

    childTransfer = async (targetBody) => {
        let requierdDV = Math.sqrt(targetBody.apoapsis) * 10
        console.log('reqDV', requierdDV)
        let stage = this.burn(requierdDV, true)
        if (stage === false) {
            console.log('you ran out of fuel, you are lost in space')
            // destroy ship
        } else {
            console.log('congrats, you are now orbiting around the moon ')
            console.log('stage', stage);

            //stage update
            const celest_body = await this.getCelestBody(targetBody.id)
            this.context.updateLocation('orbit', celest_body)
            this.context.shipSetStage(stage)
            console.log('celest_body', celest_body);
            //save to database
            updateShip(stage, this.context.state.ship.name, 'orbit', celest_body.id, this.context.state.ship.id, celest_body.lowOrbit)
        }
    }

    planetTransfert = async (targetBody) => {
        let distance
        if (targetBody.apoapsis > this.context.state.ship.altitudeFromParent) {
            distance = targetBody.apoapsis - this.context.state.ship.altitudeFromParent
        } else {
            distance = this.context.state.ship.altitudeFromParent - targetBody.apoapsis
        }
        let requierdDV = Math.sqrt(distance) / 1.5

        let stage = this.burn(requierdDV, true)
        if (stage === false) {
            console.log('you ran out of fuel, you are lost in space')
            // destroy ship
        } else {
            console.log('congrats, you are now orbiting around an other planet ')

            //stage update
            const celest_body = await this.getCelestBody(targetBody.id)
            this.context.updateLocation('orbit', celest_body)
            this.context.shipSetStage(stage)
            console.log('celest_body.childrens[0]', celest_body);
            //save to database
            updateShip(
                stage,
                this.context.state.ship.name,
                'orbit', celest_body.id,
                this.context.state.ship.id,
                celest_body.lowOrbit)
        }

    }

    backToParent = async (targetBody) => {
        let requierdDV = Math.sqrt(this.context.state.ship.celest_body.apoapsis) / 1.5
        console.log('requierdDV', requierdDV)

        let stage = this.burn(requierdDV, true)
        if (stage === false) {
            console.log('you ran out of fuel, you are lost in space')
            // destroy ship
        } else {
            console.log('congrats, you are now orbiting around a planet ')

            //stage update
            const celest_body = await this.getCelestBody(targetBody.id)
            this.context.updateLocation('orbit', celest_body)
            this.context.shipSetStage(stage)
            console.log('celest_body', celest_body);
            //save to database
            updateShip(
                stage,
                this.context.state.ship.name,
                'orbit', celest_body.id,
                this.context.state.ship.id,
                celest_body.lowOrbit)
        }

    }

    fromMoonToMoon = async (targetBody) => {
        let requierdDV = Math.abs(targetBody.apoapsis - this.context.state.ship.celest_body.apoapsis)
        console.log(requierdDV)
        let stage = this.burn(requierdDV, true)
        if (stage === false) {
            console.log('you ran out of fuel, you are lost in space')
            // destroy ship
        } else {
            console.log('congrats, you are now orbiting around another moon ')

            //stage update
            const celest_body = await this.getCelestBody(targetBody.id)
            this.context.updateLocation('orbit', celest_body)
            this.context.shipSetStage(stage)
            console.log('celest_body', celest_body);
            //save to database
            updateShip(
                stage,
                this.context.state.ship.name,
                'orbit',
                celest_body.id,
                this.context.state.ship.id,
                celest_body.lowOrbit
            )
        }
    }

    commandModuleReEntry = async () => {
        const celest_body = await this.getCelestBody(this.context.state.ship.celest_body.id)
        this.context.updateLocation('ground', celest_body)
        this.context.shipSetStage([])
        updateShip(
            [],
            this.context.state.ship.name,
            'ground',
            this.context.state.ship.celest_body.id,
            this.context.state.ship.id,
            0,
        )
    }

    render() {
        const isLoading = this.state.isLoading
        if (isLoading === false && this.context.state.ship.locationStatus === 'orbit' && this.props.stage) {
            return (
                <ShipContext.Provider>
                    <div className={this.state.isLoading ? 'disNone' : ''}>
                        <FromOrbit
                            fromOrbitToSurface={this.fromOrbitToSurface}
                            escapeFromOrbit={this.escapeFromOrbit}
                            childTransfert={(e) => this.childTransfer(e)}
                            commandModuleReEntry={this.commandModuleReEntry}
                            planetTransfert={this.planetTransfert}
                            ship={this.context.state.ship}
                            stage={this.context.state.stage}
                            fromMoonToMoon={this.fromMoonToMoon}
                            backToParent={this.backToParent}
                        />
                    </div>
                </ShipContext.Provider>)
        } else if (isLoading === false && this.context.state.ship.locationStatus === 'ground') {
            return (
                <ShipContext.Provider>
                    <div className={this.state.isLoading ? 'disNone' : ''}>
                        <FromSurface
                            className={this.state.isLoading ? 'disNone' : ''}
                            fromSurfaceToOrbit={this.fromSurfaceToOrbit}
                        />
                    </div>
                </ShipContext.Provider>
            )
        }
        else {
            return 'loading'
        }
    }
}

ManoeuvreControl.contextType = ShipContext;
