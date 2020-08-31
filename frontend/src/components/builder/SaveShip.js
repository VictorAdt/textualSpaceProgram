import React, { Component } from 'react';
import axios from 'axios'
import { UserContext } from './../../contexts/UserContext'

export default class SaveShip extends Component {
    
    saveShip = async (e) => {
        e.preventDefault();
        const stage = this.props.stage
        let partList = []

        for (let i = 0; i < stage.length; i++) {
            let currentStage = i
            let tankList = []
            let engineList = []
            if (stage[currentStage].tank && stage[currentStage].engine) {
                for (let i = 0; i < stage[currentStage].tank.length; i++) {
                    if (stage[currentStage].tank[i] !== undefined) {
                        let id = stage[currentStage].tank[i].id
                        tankList.push({ remaininFuel: stage[currentStage].tank[i].maxFuel, tank: { id: id } })
                    }
                }
                for (let i = 0; i < stage[currentStage].engine.length; i++) {
                    if (stage[currentStage].engine[i] !== undefined) {
                        let id = stage[currentStage].engine[i].id
                        engineList.push({ engine: { id: id } })
                    }
                }
                currentStage++
                partList.push({
                    tank: tankList,
                    engine: engineList,
                })
            }
        }

        for (let i = 0; i < partList.length; i++) {
            if (partList[i].tank.length < 1 || partList[i].engine.length < 1) {
                partList.splice(i, 1)
            }
        }

        if (partList.length === 0) {
            this.props.setErrorMsg("you can't launch an empty rocket", "warning")
            window.scrollTo(0, 0)
            return
        }

        if (!this.props.name || !this.props.name.replace(/\s/g, '').length) {
            this.props.setErrorMsg('you have to name your vessel', 'warning')
            window.scrollTo(0, 0)
            return
        }

        if (this.props.TWRByStage[0] < 1) {
            this.props.setErrorMsg('your first stage dont have enough thrust to take off (Add moar boosters)', 'warning')
            window.scrollTo(0, 0)
            return
        }

        const data = {
            name: this.props.name,
            stage: partList,
            celest_body: {
                id: this.props.bodyLocation
            },
            locationStatus: this.props.locationStatus,
            altitudeFromParent: 0
        }

        const headers = {
            Authorization: `Bearer ${this.context.user.jwt}`
        }
        const saveShipRes = await axios({
            method: 'POST',
            url: '/ships',
            data,
            headers
        })
        if (saveShipRes.status === 200) {
            this.props.setErrorMsg('Your ship saved successfully', 'success')
            window.scrollTo(0, 0)
            setTimeout(() => {
                window.location.pathname = '/'
            }, 500)
            return
        }
    }


    render() {
        return (
            <div className="container__button">
                <div onClick={this.saveShip} className="button ship__save__button">Save and go back to the tracking station  </div>
            </div>
        );
    }
}

SaveShip.contextType = UserContext;
