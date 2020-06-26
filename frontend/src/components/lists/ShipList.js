import React, { Component } from 'react';
import axios from 'axios';
import { ShipContext } from './../../contexts/ShipProvider'
import { Link } from 'react-router-dom';

export default class ShipList extends Component {
    state = {
        ships: null
    }
    async componentDidMount() {
        try {
            const shipListRes = await axios({
                method: 'GET',
                url: 'http://localhost:1337/ships'
            });
            const fetchedShip = shipListRes.data
            this.setState({ ships: fetchedShip })
            console.log('fetchedShip', fetchedShip)
        } catch (error) {
            console.log(error.message)
        }
    }

    selectShip = ship => {
        this.context.shipSetStage(ship)
    }

    render() {
        const ships = this.state.ships

        if (ships === null) {
            return 'loading'
        }
        return (
            <div>
                {ships.map((e, i) => {
                    return <Link to={{
                        pathname: '/shipControl',
                        id: e.id
                    }} key={i}> {e.name}
                    </Link>
                })}
            </div>
        );
    }
}

ShipList.contextType = ShipContext;
