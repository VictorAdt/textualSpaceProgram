import axios from 'axios'

export const updateShip = async (stage, name, locationStatus, bodyLocation, id, altitude) => {
    let partList = []

    for (let i = 0; i < stage.length; i++) {
        let currentStage = i
        let tankList = []
        let engineList = []
        if (stage[currentStage].tank !== undefined || stage[currentStage].engine !== undefined) {
            if (stage[currentStage].tank[i] !== undefined) {
                for (let i = 0; i < stage[currentStage].tank.length; i++) {
                    let id = stage[currentStage].tank[i].id
                    tankList.push({ remaininFuel: parseInt(stage[currentStage].tank[i].remainingFuel), tank: { id: id } })
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
        console.log('update 200')
    }
};

