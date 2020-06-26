import React, { Component } from 'react';
import ShipList from '../components/lists/ShipList';

export default class Launchpad extends Component {
    render() {
        return (
            <ShipList location="VAB" />
        );
    }
}