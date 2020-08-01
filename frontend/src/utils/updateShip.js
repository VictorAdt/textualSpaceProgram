import axios from 'axios'

export const updateShip = async (stage, name, locationStatus, bodyLocation, id, altitude) => {
    let partList = []
    console.log(stage, 'partListstage');


    for (let i = 0; i < stage.length; i++) {
        let currentStage = i
        let tankList = []
        let engineList = []
        for (let i = 0; i < stage[currentStage].tank.length; i++) {
            let id = stage[currentStage].tank[i].id
            tankList.push({ remaininFuel: parseInt(stage[currentStage].tank[i].remainingFuel), tank: { id: id } })
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
    console.log(partList, 'partList');

    const data = {
        name: name,
        user: {
            id: 1
        },
        stage: partList,
        celest_body: {
            id: bodyLocation
        },
        locationStatus: locationStatus,
        altitudeFromParent: altitude
    }

    const saveShipRes = await axios({
        method: 'PUT',
        url: `http://localhost:1337/ships/${id}`,
        data
    })
    if (saveShipRes.status === 200) {
    }
};

