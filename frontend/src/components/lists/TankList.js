import React, { Component } from 'react';
import axios from "axios";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default class TankList extends Component {
    state = {
        tanks: null
    }

    async componentDidMount() {
        const tanksRes = await axios({
            method: 'GET',
            url: '/tanks'
        })
        const fetchedTanks = tanksRes.data
        this.setState({ tanks: fetchedTanks })
        console.log('fetchedTanks', fetchedTanks)
    }

    render() {
        const tanks = this.state.tanks
        if (tanks === null) {
            return 'loading'
        } else
            return (
                <div>
                    <h3> Fuel tanks : </h3>
                    <div class="tank__card">
                        {tanks.map((e, i) => (
                            <div key={e.id} className="tank-item part">
                                <img src="" />
                                <div>
                                    <p> {e.name} </p>
                                    <p> Remaining fuel: {e.remainingFuel} </p>
                                    <p> Weight : {(e.emptyWeight + (e.remainingFuel * 0.01))} tons </p>
                                    <Button variant="dark" onClick={() => this.props.addPart(e, e.partType)} >Add</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
    }
}