import React, { Component } from 'react';
import TankList from './TankList';
import CommandModuleList from './CommandModuleList';
import EngineList from './EngineList';



export default class PartList extends Component {
    state ={
    }

    render() {

        return (
            <div className="PartList">
                <TankList addPart={this.props.addPart}/>
                <CommandModuleList addPart={this.props.addPart}/>
                <EngineList addPart={this.props.addPart}/>
            </div>
        );
    }
}