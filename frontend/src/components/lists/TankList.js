import React, { Component } from 'react';
import axios from "axios";


export default class TankList extends Component {
    state ={
        tanks: null
    }

    async componentDidMount(){
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
        if(tanks === null ){
            return 'loading'
        } else 
        return (
            <div>
                <hr/>
                <h3> TankList </h3>
                {tanks.map((e, i) => (
                    <div key={e.id} className="tank-item part">
                            <p> Name : {e.name} </p>
                            <p> Remaining fuel: {e.remainingFuel} </p>
                            <p> Weight : {(e.emptyWeight + (e.remainingFuel * 0.01))} </p>
                            <p> Fueltype : {e.fuelType} </p>
                            <button onClick={() => this.props.addPart(e, e.partType)} >Add</button>
                            <hr/>
                    </div>
                ))} 
            </div>
        );
    }
}