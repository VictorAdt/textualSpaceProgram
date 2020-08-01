import React, { Component } from 'react';
import axios from 'axios'

export default class SaveShip extends Component {

    saveShip = async (e) => {
        e.preventDefault();
        const stage = this.props.stage
        let partList = []

        for(let i = 0; i < stage.length; i ++){
            let currentStage = i
            let tankList = []
            let engineList = []
            if(stage[currentStage].tank !== undefined || stage[currentStage].engine !== undefined){
                for(let i = 0; i < stage[currentStage].tank.length; i ++) {
                    if(stage[currentStage].tank[i] !== undefined){
                        let id = stage[currentStage].tank[i].id
                        tankList.push({remaininFuel: stage[currentStage].tank[i].maxFuel, tank:{id: id}})
                    }
                }
                for(let i = 0; i < stage[currentStage].engine.length; i ++) {
                    if(stage[currentStage].engine[i] !== undefined){
                        let id = stage[currentStage].engine[i].id
                        engineList.push({engine:{id: id}})
                    }
                }

                currentStage ++
                partList.push({
                    tank: tankList,
                    engine: engineList,
                })
            } 
        }


        const data = {
            name: this.props.name,
            user: {
                id: 1
            },
            stage: partList,
            celest_body: {
                id: this.props.bodyLocation
            },
            locationStatus: this.props.locationStatus,
            altitudeFromParent: 0
        }

        console.log(data);

        const saveShipRes = await axios({
            method: 'POST',
            url: '/ships',
            data
        })
        if (saveShipRes.status === 200) {
            alert('200');
        }
    }


    render() {
        return (
            <button onClick={this.saveShip}> Save </button> 
        );
    }
}