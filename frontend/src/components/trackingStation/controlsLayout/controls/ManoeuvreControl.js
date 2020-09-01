import React, { Component } from 'react'
import { ShipContext } from './../../../../contexts/ShipProvider'
import { updateShip } from './../../../../utils/updateShip'
import { deleteShip } from './../../../../utils/deleteShip'
import FromSurface from './FromSurface'
import FromOrbit from './FromOrbit'
import axios from 'axios'
import Background from './../../../backgrounds/Background'


export default class ManoeuvreControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            stage: [],
            target: {
                celest_body: null,
                locationStatus: null
            }
        }
    }


    componentDidMount() {
        this.setState({
            stage: this.props.stage
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
        let dvByStageAfterBurn = [...this.context.state.deltaVByStage]
        let index = i
        console.log('requierdDV burn i', requierdDV, i);
        let success = true

        if (dvByStageAfterBurn[i] >= requierdDV) {
            dvByStageAfterBurn[i] -= requierdDV
            requierdDV = 0
            const lastStageRemainingFuel = this.getFuelForDV(dvByStageAfterBurn[i], i)
            for (let i = 0; i < stage[index].tank.length; i++) {
                stage[index].tank[i].remainingFuel = (lastStageRemainingFuel / stage[index].tank.length)
            }
        } else {
            if (stage[index] === undefined) { return false }
            requierdDV -= dvByStageAfterBurn[i]
            console.log('requierdDV', requierdDV);
            dvByStageAfterBurn[i] = 0
            for (let i = 0; i < stage[index].tank.length; i++) {
                stage[index].tank[i].remainingFuel = 0
            }
            if (index >= stage.length - 1) {
                success = false
            }
        }
        return { stage, requierdDV, success }
    }

    getCelestBody = async id => {
        try {
            const celestBodyRes = await axios({
                method: 'GET',
                url: `/celest-bodies/${id}`
            })
            const fetchedCelestBody = celestBodyRes.data
            return fetchedCelestBody
        } catch (e) {
            alert(e)
        }
    }

    fromSurfaceToOrbit = async () => {
        await this.props.setIsLoading(true)
        this.setState({ target: { celest_body: this.context.state.ship.celest_body, locationStatus: 'orbit' } })
        let requierdDV = (Math.sqrt(6.67408 * 10e+11
            * this.context.state.ship.celest_body.mass * 10e+21 / this.context.state.ship.celest_body.radius * 1000) / 1000000000000000) * this.context.state.ship.celest_body.atmosphere
        console.log('reqDV', requierdDV)
        let loop = this.props.stage.length
        let i = 0
        let index = 0
        while (i < loop) {
            let burn = this.burn(requierdDV, true, index)
            console.log(burn, 'burn');
            if (burn.requierdDV === 0) {
                await this.pause(2000)
                this.context.shipSetStage(burn.stage)
                break
            }
            else if (burn.requierdDV > 0) {
                requierdDV = burn.requierdDV
                console.log(requierdDV, 'requierdDV');
                await this.pause(2000)
                this.context.shipSetStage(burn.stage)
                await this.pause(2000)
                burn.stage.splice(i, 1)
                await this.pause(1000)
                this.context.shipSetStage(burn.stage)
                if (burn.success === false) {
                    this.props.setFailedMsg('you ran out of fuel and crash during ascent')
                    deleteShip(this.context.state.ship.id, this.props.user)
                    setTimeout(() => {
                        window.location.pathname = '/'
                        return
                    }, 2000);
                }
                i--
            }
            i++
        }
        const celest_body = await this.getCelestBody(this.context.state.ship.celest_body.id)
        this.context.updateLocation('orbit', celest_body.lowOrbit, celest_body,)
        //save to database
        updateShip(
            this.context.state.stage,
            this.context.state.ship.name,
            'orbit',
            celest_body.id,
            this.context.state.ship.id,
            celest_body.lowOrbit,
            this.props.user
        )
        setTimeout(() => {
            this.props.setIsLoading(false)
        }, 500)
    }

    fromOrbitToSurface = async () => {
        await this.props.setIsLoading(true)
        this.setState({ target: { celest_body: this.context.state.ship.celest_body, locationStatus: 'ground' } })
        let requierdDV = Math.sqrt((6.67408 * 10e+11 * this.context.state.ship.celest_body.mass * 10e+21) / this.context.state.ship.celest_body.radius * 1000) / 1000000000000000 / this.context.state.ship.celest_body.atmosphere
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
                requierdDV = burn.requierdDV
                await this.pause(2000)
                this.context.shipSetStage(burn.stage)
                await this.pause(2000)
                burn.stage.splice(i, 1)
                await this.pause(1000)
                this.context.shipSetStage(burn.stage)
                if (burn.success === false) {
                    this.props.setFailedMsg('you ran out of fuel and crash during re-entry')
                    deleteShip(this.context.state.ship.id, this.props.user)
                    setTimeout(() => {
                        window.location.pathname = '/'
                        return
                    }, 2000);
                }
                i--
            }
            i++
        }
        const celest_body = await this.getCelestBody(this.context.state.ship.celest_body.id)
        this.context.updateLocation('ground', 0, celest_body,)
        //save to database
        updateShip(
            this.context.state.stage,
            this.context.state.ship.name,
            'ground',
            celest_body.id,
            this.context.state.ship.id,
            0,
            this.props.user
        )
        setTimeout(() => {
            this.props.setIsLoading(false)
        }, 500)
    }

    escapeFromOrbit = async () => {
        await this.props.setIsLoading(true)
        this.setState({ target: { celest_body: this.context.state.ship.celest_body.childrens[0], locationStatus: 'orbit' } })
        let requierdDV = this.context.state.ship.celest_body.escapeVelocity - (Math.sqrt(6.67408 * 10e+11 * this.context.state.ship.celest_body.mass * 10e+21 / this.context.state.ship.celest_body.radius * 1000) / 1000000000000000).toFixed(2)
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
                requierdDV = burn.requierdDV
                await this.pause(2000)
                this.context.shipSetStage(burn.stage)
                await this.pause(2000)
                burn.stage.splice(i, 1)
                await this.pause(1000)
                this.context.shipSetStage(burn.stage)
                if (burn.success === false) {
                    this.props.setFailedMsg('you ran out of fuel and you are now lost in space')
                    deleteShip(this.context.state.ship.id, this.props.user)
                    setTimeout(() => {
                        window.location.pathname = '/'
                        this.props.setIsLoading(false)
                        return
                    }, 2000);
                }
                i--
            }
            i++
        }
        let altitude = this.context.state.ship.celest_body.apoapsis
        //stage update
        const celest_body = await this.getCelestBody(this.context.state.ship.celest_body.id)
        this.context.updateLocation('orbit', altitude, celest_body.childrens[0],)
        //save to database
        updateShip(
            this.context.state.stage,
            this.context.state.ship.name,
            'orbit',
            celest_body.childrens[0].id,
            this.context.state.ship.id,
            altitude,
            this.props.user
        )
        setTimeout(() => {
            this.props.setIsLoading(false)
        }, 500)
    }

    childTransfer = async (targetBody) => {
        await this.props.setIsLoading(true)
        this.setState({ target: { celest_body: targetBody, locationStatus: 'orbit' } })
        let requierdDV = (Math.sqrt(targetBody.apoapsis) * 10) / 2
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
                requierdDV = burn.requierdDV
                await this.pause(2000)
                this.context.shipSetStage(burn.stage)
                await this.pause(2000)
                burn.stage.splice(i, 1)
                await this.pause(1000)
                this.context.shipSetStage(burn.stage)
                if (burn.success === false) {
                    this.props.setFailedMsg('you ran out of fuel and you are now lost in space')
                    deleteShip(this.context.state.ship.id, this.props.user)
                    setTimeout(() => {
                        window.location.pathname = '/'
                        return
                    }, 2000);
                }
                i--
            }
            i++
        }
        //stage update
        const celest_body = await this.getCelestBody(targetBody.id)
        this.context.updateLocation('orbit', celest_body.lowOrbit, celest_body,)
        //save to database
        updateShip(
            this.context.state.stage,
            this.context.state.ship.name,
            'orbit', celest_body.id,
            this.context.state.ship.id,
            celest_body.lowOrbit,
            this.props.user)
        setTimeout(() => {
            this.props.setIsLoading(false)
        }, 500)
    }

    planetTransfert = async (targetBody) => {
        await this.props.setIsLoading(true)
        this.setState({ target: { celest_body: targetBody, locationStatus: 'orbit' } })
        let distance
        if (targetBody.apoapsis > this.context.state.ship.altitudeFromParent) {
            distance = targetBody.apoapsis - this.context.state.ship.altitudeFromParent
        } else {
            distance = this.context.state.ship.altitudeFromParent - targetBody.apoapsis
        }
        let requierdDV = Math.sqrt(distance) / 3
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
                requierdDV = burn.requierdDV
                await this.pause(2000)
                this.context.shipSetStage(burn.stage)
                await this.pause(2000)
                burn.stage.splice(i, 1)
                await this.pause(1000)
                this.context.shipSetStage(burn.stage)
                if (burn.success === false) {
                    this.props.setFailedMsg('you ran out of fuel and you are now lost in space')
                    deleteShip(this.context.state.ship.id, this.props.user)
                    setTimeout(() => {
                        window.location.pathname = '/'
                        return
                    }, 2000);
                }
                i--
            }
            i++
        }

        //stage update
        const celest_body = await this.getCelestBody(targetBody.id)
        this.context.updateLocation('orbit', celest_body.lowOrbit, celest_body,)
        //save to database
        updateShip(
            this.context.state.stage,
            this.context.state.ship.name,
            'orbit', celest_body.id,
            this.context.state.ship.id,
            celest_body.lowOrbit,
            this.props.user
        )
        setTimeout(() => {
            this.props.setIsLoading(false)
        }, 500)
    }

    render() {
        const { isLoading } = this.state
        if (isLoading === false && this.props.stage) {
            return (
                <ShipContext.Provider>
                    {!this.props.menuOpen &&
                        <div className={'command__control'}>
                            {this.context.state.ship.locationStatus === 'orbit' &&
                                <FromOrbit
                                    className={this.state.isLoading ? 'disNone' : ''}
                                    fromOrbitToSurface={this.fromOrbitToSurface}
                                    escapeFromOrbit={this.escapeFromOrbit}
                                    childTransfert={(e) => this.childTransfer(e)}
                                    planetTransfert={this.planetTransfert}
                                    ship={this.context.state.ship}
                                    stage={this.context.state.stage}
                                    fromMoonToMoon={this.fromMoonToMoon}
                                    backToParent={this.backToParent}
                                    isLoading={this.props.isLoading}
                                    celestBodies={this.props.celestBodies}
                                />}
                            {this.context.state.ship.locationStatus === 'ground' &&
                                <FromSurface
                                    className={this.state.isLoading ? 'disNone' : ''}
                                    fromSurfaceToOrbit={this.fromSurfaceToOrbit}
                                    isLoading={this.props.isLoading}
                                />
                            }
                        </div>}
                    {this.context.state.ship.locationStatus === 'orbit' &&
                        <div>
                            <p className="hud_1">In orbit around {this.context.state.ship.celest_body.name} </p>
                        </div>
                    }
                    {this.context.state.ship.locationStatus === 'ground' &&
                        <div>
                            <p className="hud_1">Landed on {this.context.state.ship.celest_body.name} </p>
                        </div>
                    }
                    <Background
                        context={this.context}
                        target={this.state.target}
                    />
                </ShipContext.Provider>)
        }
        else {
            return ('loading')
        }
    }
}

ManoeuvreControl.contextType = ShipContext;
