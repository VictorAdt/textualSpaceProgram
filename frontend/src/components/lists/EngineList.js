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

    drag = e => {
        e.dataTransfer.setData("data", e.target.id);
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
                    <Card key={i} className="engines-item part" id={e} draggable={true}>
                            <img />
                            <p>{e.name} </p>
                            <p> Weight : {e.weight} tons</p>
                            <p> isp : {e.isp} s</p>
                            <p> Thrust : {e.thrust} kn</p>
                            <Button variant="dark" onClick={() => this.props.addPart(e, e.partType)} >Add</Button>
                    </Card>
                ))} 
            </div>
        );
    }
}