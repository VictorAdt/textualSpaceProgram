import React, { Component } from 'react'
import { ShipContext } from '../../contexts/ShipProvider'
import { updateShip } from '../../utils/updateShip'
import { deleteShip } from '../../utils/deleteShip'
import FromSurface from './FromSurface'
import FromOrbit from './FromOrbit'
import axios from 'axios'
import Background from './../animation/Background'


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

    async getCelestBody(id) {
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
        this.setState({ target: {celest_body: this.context.state.ship.celest_body, locationStatus: 'orbit'}})
        let requierdDV = (Math.sqrt(6.67408 * 10e+11 * this.context.state.ship.celest_body.mass * 10e+21 / this.context.state.ship.celest_body.radius * 1000) / 1000000000000000) * this.context.state.ship.celest_body.atmosphere
        console.log('reqDV', requierdDV)
        let loop = this.props.stage.length
        let i = 0

        while (i < loop) {
            let burn = this.burn(requierdDV, true, i)
            if (burn.requierdDV === 0) {
                await this.pause(2000)
                this.context.shipSetStage(burn.stage)
                console.log('burn finish')
                break
            }
            else if (burn.requierdDV > 0) {
                requierdDV -= burn.requierdDV
                console.log('stage finish reqdv', requierdDV)
                await this.pause(2000)
                this.context.shipSetStage(burn.stage)
                await this.pause(2000)
                burn.stage.splice(i, 1)
                await this.pause(1000)
                this.context.shipSetStage(burn.stage)
                if (burn.success === false) {
                    alert('crash')
                    deleteShip(this.context.state.ship.id)
                    setTimeout(() => {
                        window.location.pathname = '/'
                        return
                    }, 500);

                }
                i--
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
        this.props.setIsLoading(false)
    }

    fromOrbitToSurface = async () => {
        await this.props.setIsLoading(true)
        this.setState({ target: {celest_body: this.context.state.ship.celest_body, locationStatus: 'ground'}})
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
                requierdDV -= burn.requierdDV
                await this.pause(2000)
                this.context.shipSetStage(burn.stage)
                await this.pause(2000)
                burn.stage.splice(i, 1)
                await this.pause(1000)
                this.context.shipSetStage(burn.stage)
                if (burn.success === false) {
                    alert('crash')
                    deleteShip(this.context.state.ship.id)
                    window.location.pathname = '/'
                    return
                }
                i--
            }
            i++
        }

        const celest_body = await this.getCelestBody(this.context.state.ship.celest_body.id)
        this.context.updateLocation('ground', celest_body)
        console.log('celest_body', celest_body);
        //save to database
        updateShip(
            this.context.state.stage,
            this.context.state.ship.name,
            'ground',
            celest_body.id,
            this.context.state.ship.id,
            0)
        this.props.setIsLoading(false)

    }

    escapeFromOrbit = async () => {
        await this.props.setIsLoading(true)
        this.setState({ target: {celest_body: this.context.state.ship.celest_body.childrens[0], locationStatus: 'orbit'}})
        let requierdDV = this.context.state.ship.celest_body.escapeVelocity
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
                requierdDV -= burn.requierdDV
                await this.pause(2000)
                this.context.shipSetStage(burn.stage)
                await this.pause(2000)
                burn.stage.splice(i, 1)
                await this.pause(1000)
                this.context.shipSetStage(burn.stage)
                if (burn.success === false) {
                    alert('crash')
                    deleteShip(this.context.state.ship.id)
                    window.location.pathname = '/'
                    return
                }
                i--
            }
            i++
        }
        let altitude = this.context.state.ship.celest_body.apoapsis

        //stage update
        const celest_body = await this.getCelestBody(this.context.state.ship.celest_body.id)
        this.context.updateLocation('orbit', celest_body.childrens[0])
        console.log('celest_body.childrens[0]', celest_body.childrens[0]);
        //save to database
        updateShip(
            this.context.state.stage,
            this.context.state.ship.name,
            'orbit',
            celest_body.childrens[0].id,
            this.context.state.ship.id,
            altitude
        )
        this.props.setIsLoading(false)

    }

    childTransfer = async (targetBody) => {
        await this.props.setIsLoading(true)
        this.setState({ target: {celest_body: targetBody, locationStatus: 'orbit'}})
        let requierdDV = Math.sqrt(targetBody.apoapsis) * 10
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
                requierdDV -= burn.requierdDV
                await this.pause(2000)
                this.context.shipSetStage(burn.stage)
                await this.pause(2000)
                burn.stage.splice(i, 1)
                await this.pause(1000)
                this.context.shipSetStage(burn.stage)
                if (burn.success === false) {
                    alert('crash')
                    deleteShip(this.context.state.ship.id)
                    window.location.pathname = '/'
                    return
                }
                i--
            }
            i++
        }
        //stage update
        const celest_body = await this.getCelestBody(targetBody.id)
        this.context.updateLocation('orbit', celest_body)
        //save to database
        updateShip(this.context.state.stage, this.context.state.ship.name, 'orbit', celest_body.id, this.context.state.ship.id, celest_body.lowOrbit)
        this.props.setIsLoading(false)
    }

    planetTransfert = async (targetBody) => {
        await this.props.setIsLoading(true)
        this.setState({ target: {celest_body: targetBody, locationStatus: 'orbit'}})
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
                requierdDV -= burn.requierdDV
                await this.pause(2000)
                this.context.shipSetStage(burn.stage)
                await this.pause(2000)
                burn.stage.splice(i, 1)
                await this.pause(1000)
                this.context.shipSetStage(burn.stage)
                if (burn.success === false) {
                    alert('crash')
                    deleteShip(this.context.state.ship.id)
                    window.location.pathname = '/'
                    return
                }
                i--
            }
            i++
        }

        //stage update
        const celest_body = await this.getCelestBody(targetBody.id)
        this.context.updateLocation('orbit', celest_body)
        console.log('celest_body.childrens[0]', celest_body);
        //save to database
        updateShip(
            this.context.state.stage,
            this.context.state.ship.name,
            'orbit', celest_body.id,
            this.context.state.ship.id,
            celest_body.lowOrbit)
        this.props.setIsLoading(false)
    }

    backToParent = async (targetBody) => {
        await this.props.setIsLoading(true)
        this.setState({ target: {celest_body: targetBody, locationStatus: 'orbit'}})
        let requierdDV = Math.sqrt(this.context.state.ship.celest_body.apoapsis) / 1.5
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
                requierdDV -= burn.requierdDV
                await this.pause(2000)
                this.context.shipSetStage(burn.stage)
                await this.pause(2000)
                burn.stage.splice(i, 1)
                await this.pause(1000)
                this.context.shipSetStage(burn.stage)
                if (burn.success === false) {
                    alert('crash')
                    deleteShip(this.context.state.ship.id)
                    window.location.pathname = '/'
                    return
                }
                i--
            }
            i++
        }

        //stage update
        const celest_body = await this.getCelestBody(targetBody.id)
        this.context.updateLocation('orbit', celest_body)
        console.log('celest_body', celest_body);
        //save to database
        updateShip(
            this.context.state.stage,
            this.context.state.ship.name,
            'orbit', celest_body.id,
            this.context.state.ship.id,
            celest_body.lowOrbit)
        this.props.setIsLoading(false)
    }

    fromMoonToMoon = async (targetBody) => {
        await this.props.setIsLoading(true)
        this.setState({ target: {celest_body: targetBody, locationStatus: 'orbit'}})
        let requierdDV = Math.abs(targetBody.apoapsis - this.context.state.ship.celest_body.apoapsis)
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
                requierdDV -= burn.requierdDV
                await this.pause(2000)
                this.context.shipSetStage(burn.stage)
                await this.pause(2000)
                burn.stage.splice(i, 1)
                await this.pause(1000)
                this.context.shipSetStage(burn.stage)
                if (burn.success === false) {
                    alert('crash')
                    deleteShip(this.context.state.ship.id)
                    window.location.pathname = '/'
                    return
                }
                i--
            }
            i++
        }

        //stage update
        const celest_body = await this.getCelestBody(targetBody.id)
        this.context.updateLocation('orbit', celest_body)
        console.log('celest_body', celest_body);
        //save to database
        updateShip(
            this.context.state.stage,
            this.context.state.ship.name,
            'orbit',
            celest_body.id,
            this.context.state.ship.id,
            celest_body.lowOrbit
        )
        this.props.setIsLoading(false)
    }

    commandModuleReEntry = async () => {
        await this.props.setIsLoading(true)
        this.setState({ target: {celest_body: this.context.state.ship.celest_body, locationStatus: 'ground'}})
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
        this.props.setIsLoading(false)
    }

    render() {
        const { isLoading, target } = this.state
        if (isLoading === false && this.props.stage) {
            return (
                <ShipContext.Provider>
                    {!this.props.menuOpen &&
                    <div className={'command__control'}>
                        <div>
                            {this.context.state.ship.locationStatus === 'orbit' &&
                                <FromOrbit
                                    className={this.state.isLoading ? 'disNone' : ''}
                                    fromOrbitToSurface={this.fromOrbitToSurface}
                                    escapeFromOrbit={this.escapeFromOrbit}
                                    childTransfert={(e) => this.childTransfer(e)}
                                    commandModuleReEntry={this.commandModuleReEntry}
                                    planetTransfert={this.planetTransfert}
                                    ship={this.context.state.ship}
                                    stage={this.context.state.stage}
                                    fromMoonToMoon={this.fromMoonToMoon}
                                    backToParent={this.backToParent}
                                />}
                            {this.context.state.ship.locationStatus === 'ground' &&
                                <FromSurface
                                    className={this.state.isLoading ? 'disNone' : ''}
                                    className={this.state.isLoading ? 'disNone' : ''}
                                    fromSurfaceToOrbit={this.fromSurfaceToOrbit}
                                />
                            }
                        </div>
                        
                    </div>}
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
