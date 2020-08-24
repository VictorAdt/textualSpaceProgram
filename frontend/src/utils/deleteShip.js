import axios from 'axios'

export const deleteShip = async (id, user) => {

    const headers = {
        Authorization: `Bearer ${user.user.jwt}`
    }

    const deleteShipRes = await axios({
        method: 'DELETE',
        url: `/ships/${id}`,
        headers,
    })
    if (deleteShipRes.status === 200) {
    }

};

