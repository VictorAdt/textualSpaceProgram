import React, { Component } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button'
import Vulcain from './../../assets/image/engines/Vulcain.svg'
import F1 from './../../assets/image/engines/F-1.svg'
import Merlin from './../../assets/image/engines/Merlin.svg'
import RD180 from './../../assets/image/engines/RD-180.svg'
import RS25 from './../../assets/image/engines/RS-25.svg'



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
                            {e.name === 'RS-25' &&
                                <img alt={`${e.name} pictogram`} src={RS25} />
                            }
                            {e.name === 'F-1' &&
                                <img alt={`${e.name} pictogram`} src={F1} />
                            }
                            {e.name === 'Merlin' &&
                                <img alt={`${e.name} pictogram`} src={Merlin} />
                            }
                            {e.name === 'RD-180' &&
                                <img alt={`${e.name} pictogram`} src={RD180} />
                            }
                            {e.name === 'Vulcain' &&
                                <img alt={`${e.name} pictogram`} src={Vulcain} />
                            }
                        </div>
                    ))}
                </div>
            );
    }
}