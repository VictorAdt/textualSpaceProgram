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
                                <div>
                                    <h4> {e.name} </h4>
                                    <p> Remaining fuel: {e.remainingFuel} </p>
                                    <p> Weight : {(e.emptyWeight + (e.remainingFuel * 0.01))} tons </p>
                                    <Button className="button__add__part" variant="light" onClick={() => this.props.addPart(e, e.partType)} >Add part</Button>
                                </div>
                                <div style={{
                                    width: '40%',
                                    height: e.size === 'small' ? '50px' : e.size === 'medium' ? '100px' : '150px',
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