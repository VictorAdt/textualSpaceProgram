import React, { Component } from 'react';
import axios from "axios";


export default class CommandModuleList extends Component {
    state ={
        commandModules: null
    }

    async componentDidMount(){
        const commandModuleRes= await axios({
            method: 'GET',
            url: 'http://localhost:1337/command-modules'
        });
        const fetchedCommandModules = commandModuleRes.data
        this.setState({ commandModules: fetchedCommandModules })
        console.log('fetchedCommandModules', fetchedCommandModules)
    }

    render() {
        const commandModules = this.state.commandModules
        if(commandModules === null ){
            return 'loading'
        } else 
        return (
            <div className="CommandModuleList">
                <hr/>
                <h3> CommandModuleList </h3>
                {commandModules.map((e, i) => (
                    <div key={e.id} className="commandModules-item part">
                            <p> Name : {e.name} </p>
                            <p> Weight : {e.weight} </p>
                            <p> Crew Capacity : {e.crewCapacity} </p>
                            <button onClick={() => this.props.addPart(e, e.partType)} >Add</button>
                            <hr/>
                    </div>
                ))} 
            </div>
        );
    }
}