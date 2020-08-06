import React, { Component } from 'react';
import ShipList from '../components/lists/ShipList';
import axios from 'axios'
import RandomCelestBody from './../components/animation/RandomCelestBody'
export default class TrackingStation extends Component {
    state = {
        celestBodies: null
    }

    async componentDidMount() {
        try {
            const celestBodyRes = await axios({
                method: 'GET',
                url: `/celest-bodies`
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
                <RandomCelestBody 
                    celest_body={this.state.celestBodies} />       
                <ShipList />
            </div>
        )
    } else return null
    }
}