import React, { Component } from 'react';
import axios from 'axios';
import { ShipContext } from './../../contexts/ShipProvider'
import { Link } from 'react-router-dom';


export default class ShipList extends Component {
    state = {
        ships: null
    }
    async componentDidMount() {
        console.log('shiplist', this.props.user);
        try {
            const shipListRes = await axios({
                method: 'GET',
                url: `/ships?user=${this.props.user.user.id}`
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
        if (ships === null || this.context.state.menuOpen) {
            return null
        }
        return (
            <div className="ship__list">

                {
                    ships.length > 0 &&
                    ships.map((e, i) => {
                        return (
                            e.celest_body &&
                            <div class="ship__card">
                                <Link to={{
                                    pathname: '/shipControl',
                                    id: e.id
                                }} key={i}>
                                    <div className="ship__card__body">
                                        {e.locationStatus === 'orbit' &&
                                            <p>{e.name} is in orbit around {e.celest_body.name} </p>

                                        }
                                        {e.locationStatus === 'ground' &&
                                            <p>{e.name} is landed on {e.celest_body.name} </p>
                                        }
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                {ships.length <= 0 &&
                    <div className="ship__card">
                        <div className="ship__card__body ">
                            <p className="hnone"> Your vehicule assembly building is empty </p>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

ShipList.contextType = ShipContext;
