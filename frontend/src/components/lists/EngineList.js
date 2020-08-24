import React, { Component } from 'react';
import axios from "axios";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default class EngineList extends Component {
    state = {
        engines: null
    }

    async componentDidMount() {
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

        if (engines === null) {
            return 'loading'
        } else

            return (
                <div className="EngineList">
                    <h3> Engines : </h3>
                    {engines.map((e, i) => (
                        <div key={i} className="engines-item part">
                            <div>
                                <h4> {e.name} </h4>
                                <p> Weight : {e.weight} tons</p>
                                <p> isp : {e.isp} s</p>
                                <p> Thrust : {e.thrust} kn</p>
                                <Button className="button__add__part" variant="light" onClick={() => this.props.addPart(e, e.partType)} >Add part</Button>
                            </div>
                            <img src={`http://localhost:1337${e.thumb.url}`} />
                        </div>
                    ))}
                </div>
            );
    }
}