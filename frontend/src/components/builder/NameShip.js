import React, { Component } from 'react';

export default class SaveShip extends Component {

    render() {
        return (
            <div>
                <h3> Name </h3>
                <input name="name" onChange={this.props.handleInput} />
            </div>
        );
    }
}