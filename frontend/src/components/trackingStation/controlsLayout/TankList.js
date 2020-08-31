import React, { Component } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button'

export default class TankList extends Component {
    state = {
        tanks: null
    }

    async componentDidMount() {
        const tanksRes = await axios({
            method: 'GET',
            url: '/tanks?_sort=name:ASC'
        })
        const fetchedTanks = tanksRes.data
        this.setState({ tanks: fetchedTanks })
    }

    render() {
        const tanks = this.state.tanks
        if (tanks === null) {
            return 'loading'
        } else
            return (
                <div>
                    <h3> Fuel tanks : </h3>
                    <div className="tank__card">
                        {tanks.map((e, i) => (
                            <div key={e.id} className="tank-item part">
                                <div>
                                    <h4> {e.name} </h4>
                                    <p> Fuel : {e.remainingFuel} kg</p>
                                    <p> Mass : {(e.emptyWeight + (e.remainingFuel * 0.01))} tons </p>
                                    <p> Fuel type : {e.fuelType}</p>
                                    <Button className="button__add__part" variant="light" onClick={() => this.props.addPart(e, e.partType)} >Add part</Button>
                                </div>
                                <div style={{
                                    width: '40%',
                                    height: e.size === 'small' ? '50px' : e.size === 'medium' ? '75px' : e.size === 'large' ? '100px' : '150px',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: `contain`
                                }}
                                    className="tank">
                                    <div className="tank__line"> </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
    }
}