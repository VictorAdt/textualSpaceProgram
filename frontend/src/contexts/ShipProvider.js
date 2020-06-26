import React, { Component } from 'react';
import axios from 'axios';

export const ShipContext = React.createContext()

export class ShipProvider extends Component {
    state = {
        ship: {},
        ispArray: [],
        fuelMassArray: [],
        totalMassArray: [],
        deltaV: 0,
        deltaVByStage: [],
        totalMass: 0,
        stage: [{
            commandModule: [],
            engine: [],
            tank: [],
        }],
    }

    getStats = () => {
        this.getMass();
    }

    componentDidMount(){
        console.log('ShipProvider compenentdidMount ship', this.state);
    }

    setStage = stage => {
        this.setState({ stage: stage }, () => {
            this.getMass()
        })
    }

    setShip = ship => {
        this.setState({ship: ship})
    }

    getIsp = () => {
        let ispArray = []
        let stage = this.state.stage

        for (let i = 0; i < stage.length; i++) {
            if (stage[i].engine.length > 0) {
                let currentStage = i
                let currentStageISP = []
                for (let i = 0; i < stage[currentStage].engine.length; i++) {
                    currentStageISP.push(stage[currentStage].engine[i].isp)
                }
                ispArray.push(currentStageISP.reduce((a, b) => a + b, 0) / currentStageISP.length)
                currentStage++
            }
            else {
                ispArray.push(0)
            }
        }
        this.setState({ ispArray: ispArray }, () => {
            this.getMassSumOfStages()
        })
    }

    getFuelMass = () => {
        let fuelMassArray = []
        let stage = this.state.stage

        for (let i = 0; i < stage.length; i++) {
            if (stage[i].tank.length > 0) {
                let currentStage = i
                let currentfuelMass = []
                for (let i = 0; i < stage[currentStage].tank.length; i++) {
                    currentfuelMass.push(stage[currentStage].tank[i].remainingFuel * 0.01)
                }
                fuelMassArray.push(currentfuelMass.reduce((a, b) => a + b, 0))
                currentStage++
            }
            else {
                fuelMassArray.push(0)
            }
        }
        this.setState({ fuelMassArray: fuelMassArray }, () => {
            this.getIsp()
        })
    }

    getMass = () => {
        let totalMassArray = []
        let stage = this.state.stage

        for (let i = 0; i < stage.length; i++) {
            let currentStage = i
            let currentMass = []
            if (stage[currentStage].tank !== undefined || stage[currentStage].engine !== undefined || stage[currentStage].commandModule !== undefined) {
                for (let i = 0; i < stage[currentStage].tank.length; i++) {
                    if (stage[currentStage].tank[i] !== undefined) {
                        currentMass.push(parseInt(stage[currentStage].tank[i].remainingFuel * 0.01))
                        currentMass.push(parseInt(stage[currentStage].tank[i].emptyWeight))
                    }
                }
                for (let i = 0; i < stage[currentStage].engine.length; i++) {
                    if (stage[currentStage].engine[i] !== undefined) {
                        currentMass.push(parseInt(stage[currentStage].engine[i].weight))
                    }
                }
                for (let i = 0; i < stage[currentStage].commandModule.length; i++) {
                    if (stage[currentStage].commandModule[i] !== undefined) {
                        currentMass.push(parseInt(stage[currentStage].commandModule[i].weight))
                    }
                }
                totalMassArray.push(parseInt(currentMass.reduce((a, b) => a + b, 0)))
                currentStage++
            } else {
                totalMassArray.push(0)
            }
        }
        this.setState({ totalMassArray: totalMassArray, totalMass: totalMassArray.reduce((a, b) => a + b, 0) }, () => {
            this.getFuelMass()
            this.getMaxFuelByStage()
        })

    }

    getMassSumOfStages = () => {
        let massSum = []
        let massArr = this.state.totalMassArray
        let i = 0;
        while (i < massArr.length) {
            let total = massArr.reduce((a, b) => a + b, 0)
            massSum.push(total)
            massArr.splice(i, 1, 0)
            i++
        }
        this.setState({ massSum: massSum }, () => {
            this.getDeltaVByStage()
        })
    }

    getDeltaVByStage = () => {
        let deltaVByStage = []
        let summArr = this.state.massSum

        for (let i = 0; i < summArr.length; i++) {
            let isp = this.state.ispArray
            let fuelMassArray = this.state.fuelMassArray
            let dryMass = (summArr[i] - fuelMassArray[i])
            let deltaV = isp[i] * 9.82 * Math.log(summArr[i] / dryMass)
            if (!isNaN(deltaV)) {
                deltaVByStage.push(deltaV)
                this.setState({ deltaV: deltaVByStage.reduce((a, b) => a + b, 0) })
            } else {
                deltaVByStage.push(0)
            }
        }
        this.setState({ deltaVByStage: deltaVByStage }, () => {
            console.log('ShipProvider this.state', this.state);
        })
    }

     getMaxFuelByStage =  () => {
        let maxFuelMassArray = []
        let stage = this.state.stage

        for (let i = 0; i < stage.length; i++) {
            if (stage[i].tank.length > 0) {
                let currentStage = i
                let currentMaxFuel = []
                for (let i = 0; i < stage[currentStage].tank.length; i++) {
                    currentMaxFuel.push(stage[currentStage].tank[i].maxFuel)
                }
                maxFuelMassArray.push(currentMaxFuel.reduce((a, b) => a + b, 0))
                currentStage++
            }
            else {
                maxFuelMassArray.push(0)
            }
        }
        this.setState({ maxFuelMassArray: maxFuelMassArray }, () => {
            console.log('this.state.maxFuelMassArray', this.state.maxFuelMassArray);
        })
    }

    /* getFuelForDV = dv => {
        this.getMaxFuelByStage()
        let summArr = this.state.massSum
        let fuelMassArray = this.state.fuelMassArray
        let dryMass = (summArr[0] - fuelMassArray[0])
        let wetMass = dryMass * Math.exp(dv / (9.82 * this.state.ispArray[0]))
        let fuelWeight = wetMass - dryMass
        let fuelAmount = fuelWeight * 100
        console.log('fuelAmount', fuelAmount);
        return fuelAmount
    }*/

    async updateLocation(status, celest_body){
        let ship = this.state.ship
        console.log('param', celest_body, status);
        ship.locationStatus = status
        try {
            const celestBodyRes = await axios({
                method: 'GET',
                url: `http://localhost:1337/celest-bodies/${celest_body.id}`
            })
            const fetchedCelestBody = celestBodyRes.data
            console.log('fetchedCelestBody' ,fetchedCelestBody);
            ship.celest_body = fetchedCelestBody
        } catch(e){
            console.log(e);
        }
        this.setState({ship: ship}, () => {
            console.log('updatedShip', ship);
        })
    }

    render() {

        return (
            <ShipContext.Provider value={{ 
                state: this.state,
                shipSetStage: stage => this.setStage(stage),
                getStats: () => this.getStats(),
                getFuelForDV: dv => this.getFuelForDV(dv),
                setShip: ship => this.setShip(ship),
                updateLocation: (status, celest_body) => this.updateLocation(status, celest_body)
            }}>
                {this.props.children}
            </ShipContext.Provider>
        );
    }
}