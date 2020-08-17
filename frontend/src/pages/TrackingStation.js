import React, { Component } from 'react';
import ShipList from '../components/lists/ShipList';
import axios from 'axios'
import RandomCelestBody from './../components/animation/RandomCelestBody'
import { UserContext } from '../contexts/UserContext';
export default class TrackingStation extends Component {

    render() {
        const {celestBodies} = this.props
        if(celestBodies){
        return (
            <div>
                <RandomCelestBody 
                    celest_body={celestBodies} />       
                <ShipList 
                    user={this.context.user}
                />
            </div>
        )
    } else return null
    }
}

TrackingStation.contextType = UserContext;
