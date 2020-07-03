import React, { Component } from 'react'
import { ShipContext } from '../../contexts/ShipProvider'
import { updateShip } from '../../utils/updateShip'
import { deleteShip } from '../../utils/deleteShip'
import FromSurface from './FromSurface'
import FromOrbit from './FromOrbit'
import axios from 'axios'

export default class ManoeuvreControl extends Component {
    state = {
        isLoading: false
    }



     burn = (requierdDV, risk) => {
        let stage = this.context.state.stage
        let dvByStageAfterBurn = [...this.context.state.deltaVByStage]
        let dvbystage = [...this.context.state.deltaVByStage]
        console.log('manoeuvre burn dvbystage', dvbystage);
        console.log('manoeuvre burn stage', stage);

        let dif = []

        for (let i = 0; i < dvByStageAfterBurn.length; i++) {
            if (dvByStageAfterBurn[i] > requierdDV) {
                dvByStageAfterBurn[i] -= requierdDV
                requierdDV = 0
            } else {
                requierdDV -= dvByStageAfterBurn[i]
                dvByStageAfterBurn[i] = 0
            }
        }
        // stage separation
        for (let i = 0; i < dvByStageAfterBurn.length; i++) {
            if (dvByStageAfterBurn[i] === 0) {
                stage.splice(0, 1)
                dvByStageAfterBurn.splice(0, 1)
                dvbystage.splice(0, 1)
            }
        }
        // getDv % diference
        for (let i = 0; i < dvbystage.length; i++) {
            dif.push(dvByStageAfterBurn[i] / (dvbystage[i] / 100))
        }
        console.log('dif', dif);
        // updateFuelLastStage
        if (requierdDV === 0) {
            for (let i = 0; i < stage[0].tank.length; i++) {
                stage[0].tank[i].remainingFuel = (stage[0].tank[i].remainingFuel / 100 * dif[0]) / 1.6
            }
        }
        if (requierdDV !== 0) {
            if (risk === true) {
                deleteShip(this.context.state.ship.id)
                return false
            }
        }
        console.log('dvbystage', dvbystage);
        console.log('dvByStageAfterBurn', dvByStageAfterBurn);
        return stage
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

    fromSurfaceToOrbit = () => {
        let requierdDV = Math.sqrt(this.context.state.ship.celest_body.mu / this.context.state.ship.celest_body.radius) * 1000 * this.context.state.ship.celest_body.atmosphere
        console.log('reqDV', requierdDV);
        let stage = this.burn(requierdDV, true)
        if (stage === false) {
            this.setState({ isLoading: false }, () => {
                console.log('you ran out of fuel and your rocket crashed');
            })
        } else {
            this.setState({ isLoading: false }, async () => {

                // Do animation success stuff
                console.log('congrats, you reach orbit');

                //stage update
                const celest_body = await this.getCelestBody(this.context.state.ship.celest_body.id)
                this.context.shipSetStage(stage)
                this.context.updateLocation('orbit', celest_body)

                console.log('celest_body', celest_body);

                //save to database
                updateShip(stage, this.context.state.ship.name, 'orbit', celest_body.id, this.context.state.ship.id, celest_body.lowOrbit)

            })
        }
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
        let requierdDV = Math.sqrt(targetBody.apoapsis) / 1.5
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
        console.log('requierdDV',requierdDV)

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

    commandModuleReEntry = () => {
        let nb = this.context.state.stage.lenght - 1
        let lastStage = this.context.state.stage[nb]

    }

    render() {
        const isLoading = this.state.isLoading
        if (isLoading === false && this.context.state.ship.locationStatus === 'orbit') {
            return <ShipContext.Provider>
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
            </ShipContext.Provider>
        } else if (isLoading === false && this.context.state.ship.locationStatus === 'ground') {
            return <ShipContext.Provider>
                <FromSurface
                    fromSurfaceToOrbit={this.fromSurfaceToOrbit}
                />
            </ShipContext.Provider>
        }
        else {
            return 'loading'
        }
    }
}

ManoeuvreControl.contextType = ShipContext;
