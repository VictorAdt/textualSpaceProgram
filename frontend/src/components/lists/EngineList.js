import React, { Component } from 'react';
import axios from "axios";


export default class EngineList extends Component {
    state ={
        engines: null
    }

    async componentDidMount(){
        const engineRes = await axios({
            method: 'GET',
            url: '/engines'
        });
        const fetchedEngines = engineRes.data
        this.setState({ engines: fetchedEngines })
        console.log('fetchedEngines', fetchedEngines)
    }

    render() {

        const engines = this.state.engines

        if(engines === null ){
            return 'loading'
        } else 

        return (
            <div className="EngineList">
                <hr/>
                <h3> EngineList </h3>
                {engines.map((e, i) => (
                    <div key={e.id} className="engines-item part" >
                            <p> Name : {e.name} </p>
                            <p> Weight : {e.weight} </p>
                            <p> isp : {e.isp} </p>
                            <p> Thrust : {e.thrust} </p>
                            <button onClick={() => this.props.addPart(e, e.partType)} >Add</button>
                            <hr/>
                    </div>
                ))} 
            </div>
        );
    }
}