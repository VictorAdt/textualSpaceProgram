import React, { Component } from 'react';

export default class SaveShip extends Component {

    render() {
        return (
            <div>
                <input name="name" onChange={this.props.handleInput} placeholder="Name your ship" type="text" />
            </div>
        );
    }
}