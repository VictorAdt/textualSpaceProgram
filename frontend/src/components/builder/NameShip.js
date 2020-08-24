import React, { Component } from 'react';

export default class SaveShip extends Component {

    render() {
        return (
            <div>
                <input className="name__ship" name="name" onChange={this.props.handleInput} placeholder="Name your ship" type="text" />
            </div>
        );
    }
}