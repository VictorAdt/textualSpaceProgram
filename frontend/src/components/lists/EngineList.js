import React, { Component } from 'react';
import axios from "axios";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

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
                <h3> Engines : </h3>
                {engines.map((e, i) => (
                    <Card key={e.id} className="engines-item part" >
                            <p> Name : {e.name} </p>
                            <p> Weight : {e.weight} </p>
                            <p> isp : {e.isp} </p>
                            <p> Thrust : {e.thrust} </p>
                            <Button variant="dark" onClick={() => this.props.addPart(e, e.partType)} >Add</Button>
                    </Card>
                ))} 
            </div>
        );
    }
}