import React, { Component } from 'react';
import axios from 'axios';

export const ShipContext = React.createContext()

export class ShipProvider extends Component {
    state = {
        menuOpen: false,
        isLoading: false,
        thrustArr: [],
        TWRByStage: [],
        ship: {},
        massSum: [],
        ispArray: [],
        fuelMassArray: [],
        totalMassArray: [],
        maxFuelMassArray: [],
        deltaV: 0,
        deltaVByStage: [],
        totalMass: 0,
        stage: [{
            engine: [],
            tank: [],
        }],
    }

    setMenuOpen = bool => {
        this.setState({ menuOpen: bool })
    }

    getStats = () => {
        this.getMass();
    }

    setStage = stage => {
        this.setState({ stage: stage }, () => {
            this.getMass()
        })
    }

    setIsLoading = state => {
        this.setState({ isLoading: state })
    }

    setShip = ship => {
        this.setState({ ship: ship })
    }

    getThrustbyStage = () => {
        let { stage } = this.state
        let thrustArr = []

        for (let i = 0; i < stage.length; i++) {
            if (stage[i].engine !== undefined) {
                let currentStage = i
                let currentStageThrust = []
                for (let i = 0; i < stage[currentStage].engine.length; i++) {
                    currentStageThrust.push(stage[currentStage].engine[i].thrust)
                }
                thrustArr.push(currentStageThrust.reduce((a, b) => a + b, 0))
                currentStage++
            }
            else {
                thrustArr.push(0)
            }
        }
        this.setState({ thrustArr: thrustArr })
    }

    fromMassToWeight = massSum => {
        massSum.map((e, i) => (
            e = e * 9.8
        ))
        return massSum
    }

    getTWRByStage = () => {
        let { massSum, thrustArr } = this.state
        let weightArr = this.fromMassToWeight(massSum)
        let TWRByStage = []
        weightArr.map((e, i) => (
            TWRByStage.push(thrustArr[i] / e)
        ))
        this.setState({ TWRByStage: TWRByStage })
    }

    getIsp = () => {
        let ispArray = []
        let stage = this.state.stage

        for (let i = 0; i < stage.length; i++) {
            if (stage[i].engine !== undefined) {
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
            this.getThrustbyStage()
        })
    }

    getFuelMass = () => {
        let fuelMassArray = []
        let stage = this.state.stage

        for (let i = 0; i < stage.length; i++) {
            if (stage[i].tank !== undefined) {
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
            if (stage[currentStage].tank !== undefined || stage[currentStage].engine !== undefined) {
                for (let i = 0; i < stage[currentStage].tank.length; i++) {
                    if (stage[currentStage].tank[i] !== undefined) {
                        currentMass.push(stage[currentStage].tank[i].remainingFuel * 0.01)
                        currentMass.push(stage[currentStage].tank[i].emptyWeight)
                    }
                }
                for (let i = 0; i < stage[currentStage].engine.length; i++) {
                    if (stage[currentStage].engine[i] !== undefined) {
                        currentMass.push(stage[currentStage].engine[i].weight)
                    }
                }
                totalMassArray.push(currentMass.reduce((a, b) => a + b, 0))
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
        let massArr = [...this.state.totalMassArray]
        let i = 0;
        while (i < massArr.length) {
            let total = massArr.reduce((a, b) => a + b, 0)
            massSum.push(total)
            massArr.splice(i, 1, 0)
            i++
        }
        this.setState({ massSum: massSum }, () => {
            this.getDeltaVByStage()
            this.getTWRByStage()
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

    getMaxFuelByStage = () => {
        let maxFuelMassArray = []
        let stage = this.state.stage

        for (let i = 0; i < stage.length; i++) {
            if (stage[i].tank !== undefined) {
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
        this.setState({ maxFuelMassArray: maxFuelMassArray })
    }

    updateLocation = async (status, shipAltitude, celest_body,) => {
        let ship = this.state.ship
        ship.locationStatus = status
        ship.altitudeFromParent = shipAltitude
        try {
            const celestBodyRes = await axios({
                method: 'GET',
                url: `http://localhost:1337/celest-bodies/${celest_body.id}`
            })
            const fetchedCelestBody = celestBodyRes.data
            ship.celest_body = fetchedCelestBody
        } catch (e) {
            console.log(e);
        }
        this.setState({ ship: ship })
    }

    render() {

        return (
            <ShipContext.Provider value={{
                state: this.state,
                shipSetStage: stage => this.setStage(stage),
                getStats: () => this.getStats(),
                getFuelForDV: dv => this.getFuelForDV(dv),
                setShip: ship => this.setShip(ship),
                updateLocation: (status, shipAltitude, celest_body) => this.updateLocation(status, shipAltitude, celest_body),
                setIsLoading: state => this.setIsLoading(state),
                setMenuOpen: bool => this.setMenuOpen(bool)
            }}>
                {this.props.children}
            </ShipContext.Provider>
        );
    }
}