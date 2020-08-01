import React, { Component } from 'react';
import ShipList from '../components/lists/ShipList';
import axios from 'axios'
import SolarSystem from './../components/animation/SolarSystem'
export default class TrackingStation extends Component {
    state = {
        celestBodies: null
    }

    async componentDidMount() {
        try {
            const celestBodyRes = await axios({
                method: 'GET',
                url: `/celest-bodies/`
            })
            const fetchedCelestBody = celestBodyRes.data
            this.setState({celestBodies: fetchedCelestBody})
        } catch (e) {
            alert(e)
        }
    }
    render() {
        if(this.state.celestBodies){
        return (
            <div>
                <SolarSystem
                    celestBodies={this.state.celestBodies}
                />
                <ShipList />
            </div>
        )
    } else return null
    }
}