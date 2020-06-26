import React, { Component } from 'react';

export default class RocketStats extends Component {
    render() {
        return (
            <div className="RocketStats">
                <hr/>
                <h4> Rocket Stat </h4>
                <p> deltaV:  {this.props.deltaV} </p>
                <p> TWR: </p>
                <p> Weight: {this.props.shipWeight} T</p>
                <hr/>
            </div>
        );
    }
}