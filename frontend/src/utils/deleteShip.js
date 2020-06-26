import axios from 'axios'

export const deleteShip = async id => {

    const deleteShipRes = await axios({
        method: 'DELETE',
        url: `http://localhost:1337/ships/${id}`, 
    })
    if (deleteShipRes.status === 200) {
        alert('delete 200');
    }

};

